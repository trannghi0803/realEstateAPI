import { BaseController } from "../base";
import { UserModel } from "../../models";
import { UserService } from "../../services";
import { Constants, Strings } from "../../../constants";
import { Helpers, IStaff } from "../../../commons/utils";
import { GlobalState } from "../../../stores/GlobalState";

class ProfileController extends BaseController<UserModel, UserService> {
    constructor(props: any) {
        super(props, UserModel, UserService);
    }

    async onStarted() {
        let staff: IStaff = GlobalState.userInfo;
        this.setModel({
            staff,
        })
    }

    setValueBydataChangePW = (key: string, val: any) => {
        let data: any = { ...this.model.dataChangePW };
        data[key] = { value: val }
        this.setModel({
            dataChangePW: data
        })
    }

    checkValidateChangePW = () => {
        let isCheck = true;
        const listKey = ["phoneNumber", "newPassword", "oldPassword"];
        let data: any = { ...this.model.dataChangePW };
        listKey.forEach(key => {
            if (Helpers.isNullOrEmpty(data[key]?.value)) {
                data[key] = { error: Strings.Validation.REQUIRED };
                isCheck = false;
            }
        });

        listKey.forEach(key => {
            if (!Helpers.isNullOrEmpty(data[key]?.error)) {
                isCheck = false;
            }
        });
        this.setModel({
            dataChangePW: data
        });
        return isCheck;

    }

    onChangePassword = async () => {
        if (this.checkValidateChangePW()) {
            try {
                this.showPageLoading();
                const data = {
                    phoneNumber: this.model.dataChangePW?.phoneNumber?.value,
                    newPassword: this.model.dataChangePW?.newPassword?.value,
                    oldPassword: this.model.dataChangePW?.oldPassword?.value,
                }
                const result = await this.service.changePassword(data);
                if (result.statusCode === Constants.ApiCode.SUCCESS) {
                    Helpers.showAlert(Strings.ProfileInfo.UPDATE_PASSWORD_SUCCESSFULL, "success");
                    this.setModel({ isShowModal: false, dataChangePW: undefined, renderKey: Date.now() })
                }
                this.hidePageLoading();
            } catch (error) {
                this.hidePageLoading();
                this.handleException(error);
            }
        }
    }
}
export default ProfileController;