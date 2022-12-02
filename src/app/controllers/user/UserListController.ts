import { BaseController } from "../base";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { Strings } from "../../../constants";
import { Helpers } from "../../../commons/utils";

class UserListController extends BaseController<UserModel, UserService> {
    constructor(props: any) {
        super(props, UserModel, UserService);
    }

    async onStarted() {
        this.showPageLoading();
        await this.getPaged();
        this.hidePageLoading();
    }

    public handleChangePage = async (event: any, currentPageNumber: number) => {
        this.showPageLoading();

        this.hidePageLoading();
    }

    getPaged = async () => {
        try {
            this.showPageLoading();
            let userList: any[] = [];
            const data = await this.service.getPaged();
            data.user?.map((el: any) => {
                userList.push({ ...el, id: el._id });
            })
            this.setModel({
                userList
            })
            console.log("data", data)
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