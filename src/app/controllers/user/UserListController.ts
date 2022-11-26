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

    }

    public handleChangePage = async (event: any, currentPageNumber: number) => {
        this.showPageLoading();

        this.hidePageLoading();
    }

    getPaged = async () => {
        try {
            this.showPageLoading();

            this.hidePageLoading();
        } catch (error) {
            this.handleException(error)
            this.hidePageLoading();
        }

    }

    deleteUser = (id: string, e: any) => {
        e.stopPropagation();
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_DELETE, async () => {
            try {
                this.showPageLoading();

                this.hidePageLoading()
            } catch (error) {
                Helpers.showAlert(Strings.Message.DELETE_ERROR, "error")
                this.hidePageLoading()
            }
        })

    }
}
export default UserListController;