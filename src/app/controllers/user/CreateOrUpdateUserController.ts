import moment from "moment";
import { BaseController } from "../base";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { UserModel } from "../../models";
import { UserService } from "../../services";

class CreateOrUpdateUserController extends BaseController<UserModel, UserService> {
    constructor(props: any) {
        super(props, UserModel, UserService);
    }

    async onStarted() {
        try {
            this.showPageLoading();
            let { id } = this.getUrlParams(["id"]);
            if (id) {
                await this.getDetail(id);
            }
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }

    getDetail = async (id: string) => {
        try {
            this.showPageLoading();
            const data = await this.service.getDetail(id);
            console.log("getDetail", data)
            this.setModel({
                id: data.user._id,
                userName: { value: data.user.userName },
                phoneNumber: { value: data.user.phoneNumber },
                email: { value: data.user.email },
                role: data.user.role,
                status: data.user.status,
                avatar: data.user.avatar,
                imageDisplay: [data.user.avatar],
                renderKey: Date.now()
            })

            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }

    isCheckValidate() {
        let isValid = true;
        if (Helpers.isNullOrEmpty(this.model.userName?.value)) {
            this.setModel({
                userName: { error: Strings.Validation.REQUIRED }
            })
            isValid = false;
        }
        if (Helpers.isNullOrEmpty(this.model.phoneNumber?.value)) {
            this.setModel({
                phoneNumber: { error: Strings.Validation.REQUIRED }
            })
            isValid = false;
        } else if (!Helpers.checkValidatePhone(this.model.phoneNumber?.value || '')) {
            this.setModel({
                phoneNumber: { error: Strings.Validation.PHONE_NUMBER }
            })
            isValid = false;
        }

        if (Helpers.isNullOrEmpty(this.model.email?.value)) {
            this.setModel({
                email: { error: Strings.Validation.REQUIRED }
            })
            isValid = false;
        } else if (!Helpers.checkValidateEmail(this.model.email?.value)) {
            this.setModel({
                email: { error: Strings.Validation.EMAIL_ADDRESS }
            })
            isValid = false;
        }

        return isValid;
    }
    onCreateOrUpdateUser = async () => {
        try {
            if (!this.isCheckValidate()) {
                return;
            }
            this.showPageLoading();
            let data: any = {
                userName: this.model.userName?.value,
                phoneNumber: this.model.phoneNumber?.value,
                email: this.model.email?.value,
                avatar: this.model.avatar,
                role: this.model.role
            }
            let result: any;
            if (Helpers.isNullOrEmpty(this.model.id)) {
                result = await this.service.createUser(data);
                console.log("result", result)
                Helpers.showAlert(Strings.Message.CREATE_SUCCESS, 'success')
            } else {
                data.id = this.model.id;
                result = await this.service.updateUser(data);
                Helpers.showAlert(Strings.Message.UPDATE_SUCCESS, 'success')
            }
            this.history.goBack();
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }

    handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                this.showPageLoading();
                var photos: any[] = [];
                photos.push(...(this.model.avatar || []));
                for (let i = 0; i < e.target.files.length; i++) {
                    if ((e.target.files[i].size / 1048576) > 2) {
                        Helpers.showAlert("Hình " + e.target.files[i].name + " đã vượt quá 2mb. vui lòng chọn hình khác!");
                        e.target.value = '';
                        return
                    }
                    if (e.target.files[i].type !== "image/png" && e.target.files[i].type !== "image/gif" && e.target.files[i].type !== "image/jpeg") {
                        Helpers.showAlert("File " + e.target.files[i].name + " Không đúng định dạng hình ảnh cho phép!");
                        e.target.value = '';
                        return
                    } else {
                        // if ((e.target.files[i].size / 1048576) > 1) {
                        console.time("res")
                        const fileId: any = await this.service.uploadImage(e.target.files[i]);
                        // console.log("fileId", fileId);
                        photos.push(
                            fileId.url
                        );
                        console.timeEnd("res")
                    }
                }

                this.setModel({
                    imageDisplay: photos,
                    avatar: photos[0],
                })
                this.hidePageLoading();
            }
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            Helpers.showAlert(`${error}`);
        }
    }

    handleDeletePhoto = (index: number, id?: string) => {
        this.setModel({
            imageDisplay: [],
            avatar: undefined,
        })
    }
}
export default CreateOrUpdateUserController;