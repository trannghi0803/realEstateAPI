import { BaseController } from "../base";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { Constants, Screens, Strings } from "../../../constants";
import { Helpers } from "../../../commons/utils";

class UserListController extends BaseController<UserModel, UserService> {
    constructor(props: any) {
        super(props, UserModel, UserService);
    }

    async onStarted() {
        this.showPageLoading();
        const { page = '1' } = this.getUrlParams(["page"]);
        const { pageSize = '10' } = this.getUrlParams(["pageSize"]);
        const params = window.location.search;
        let query = new URLSearchParams(params);
        this.setModel({
            searchText: query.get('searchText') || undefined,
            pageNumber: Number(page),
            pageSize: Number(pageSize),
        })
        await this.getPaged();
        this.hidePageLoading();
    }

    public handleChangePage = async (pageNumber: number, pageSize: number) => {
        this.showPageLoading();
        const page = Math.ceil((this.model.totalCount || 0) / (pageSize || 1)) || 1;
        const pageNumberTemp = (pageNumber || 1) >= page ? page : (pageNumber || 1);
        this.setModel({
            pageNumber: pageNumberTemp,
            pageSize
        })
        await this.getPaged()
        this.hidePageLoading();
    }

    getPaged = async () => {
        try {
            this.showPageLoading();
            let data: any = {
                pageNumber: this.model.pageNumber,
                pageSize: this.model.pageSize,
                userName: this.model.searchText || undefined
            }
            const result = await this.service.getPaged(data);
            // let userList: any[] = [];
            // data.user?.map((el: any) => {
            //     userList.push({ ...el, id: el._id });
            // })
            this.setModel({
                userList: result?.result,
                totalCount: result.totalCount,
                pageNumber: result.pageNumber,
                pageSize: result.pageSize,
            })
            let queryString = `&page=${this.model.pageNumber || 1}&pageSize=${this.model.pageSize || Constants.ROW_PER_PAGE}`;
            if (!Helpers.isNullOrEmpty(this.model.searchText)) { queryString += `&searchText=${this.model.searchText}` }

            this.history.replace({
                pathname: Screens.ADMIN_USER,
                search: queryString
            });
            this.hidePageLoading();
        } catch (error) {
            this.handleException(error)
            this.hidePageLoading();
        }

    }

    deleteUser = async (id: string, e: any) => {
        e.stopPropagation();
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_DELETE, async () => {
            try {
                this.showPageLoading();
                const result = await this.service.deleteUser(id)
                Helpers.showAlert(Strings.Message.DELETE_SUCCESS, "info")
                await this.getPaged()
                this.hidePageLoading()
            } catch (error) {
                Helpers.showAlert(Strings.Message.DELETE_ERROR, "error")
                this.hidePageLoading()
            }
        })
    }
}
export default UserListController;