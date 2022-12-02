import { BaseController } from "../base";
import { Helpers } from "../../../commons/utils";
import { GlobalState } from "../../../stores/GlobalState";
import { Constants, Screens, Strings } from "../../../constants";
import { CategoryService, NewsService, RealEstateService } from "../../services";
import { NewsModel } from "../../models";

class NewsListController extends BaseController<NewsModel, NewsService> {
    constructor(props: any) {
        super(props, NewsModel, NewsService);
    }

    async onStarted() {
        try {
            const { page = '1' } = this.getUrlParams(["page"]);
            const { pageSize = '10' } = this.getUrlParams(["pageSize"]);
            const params = window.location.search;
            let query = new URLSearchParams(params);
            this.setModel({
                totalCount: GlobalState.totalCount || 0,
                searchText: query.get('searchText') || undefined,
                pageNumber: Number(page),
                pageSize: Number(pageSize),
            })
            await this.getPaged();
        } catch (error) {

        }
    }

    handleChangePage = async (pageNumber: number, pageSize: number) => {
        const page = Math.ceil((this.model.totalCount || 0) / (pageSize || 1)) || 1;
        const pageNumberTemp = (pageNumber || 1) >= page ? page : (pageNumber || 1);
        this.setModel({
            pageNumber: pageNumberTemp,
            pageSize
        })
        await this.getPaged()
    }

    public getPaged = async () => {
        try {
            this.showPageLoading();
            let data: any = {
                pageNumber: this.model.pageNumber,
                pageSize: this.model.pageSize,
                title: this.model.searchText || undefined
            }
            const result = await this.service.getPaged(data);
            
            this.setModel({
                newsList: result?.result || [],
                totalCount: result.totalCount,
                pageNumber: result.pageNumber,
                pageSize: result.pageSize,
            })
            let queryString = `&page=${this.model.pageNumber || 1}&pageSize=${this.model.pageSize || Constants.ROW_PER_PAGE}`;
            if (!Helpers.isNullOrEmpty(this.model.searchText)) { queryString += `&searchText=${this.model.searchText}` }
            this.history.replace({
                pathname: Screens.ADMIN_NEWS,
                search: queryString
            });
            this.hidePageLoading();

        } catch (error) {
            this.handleException(error);
            await Helpers.showAlert(Strings.Message.ERROR, "error");
            this.hidePageLoading();
        }
    }

    deleteNews = (id: string) => {
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_DELETE, async () => {
            try {
                this.showPageLoading();
                const result = await this.service.delete(id);
                if (result.statusCode === Constants.ApiCode.SUCCESS) {
                    Helpers.showAlert(Strings.Message.DELETE_SUCCESS, "success");
                    this.getPaged();
                } else {
                    Helpers.showAlert(Strings.Message.DELETE_ERROR, "error")
                }
                this.hidePageLoading()
            } catch (error) {
                this.handleException(error)
                this.hidePageLoading()
            }
        })
    }

}
export default NewsListController;