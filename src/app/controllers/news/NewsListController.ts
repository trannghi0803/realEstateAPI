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

    public getPaged = async () => {
        try {
            this.showPageLoading();

            const result = await this.service.getAll();
            let newsList: any = [];
            let totalCount = 0;
            result?.map((el: any, i: number) => {
                
                newsList.push({...el, id: el._id})
                totalCount++;
            })
            this.setModel({
                newsList,
                totalCount
            })

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