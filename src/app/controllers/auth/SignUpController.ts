import { Helpers } from "../../../commons/utils";
import { signinRedirect } from "../../../config";
import { Constants, Strings } from "../../../constants";
import { AuthModel } from "../../models";
import { AuthService } from "../../services";
import { BaseController } from "../base";
class SignUpController extends BaseController<AuthModel, AuthService> {

    constructor(props: any) {
        super(props, AuthModel, AuthService);
    }

    public async onStarted() {

    }

    async handleSubmit() {
        try {
            // if (!this.onValidateInput()) {
            //     return;
            // }
            // this.showPageLoading();
            // const data = {
            //     email: this.model.email?.value,
            //     password: this.model.password?.value,
            //     confirmPassword: this.model.confirmPassword?.value,
            //     phoneNumber: this.model.phone?.value,
            //     fullName: this.model.fullName?.value,
            //     userName: this.model.userName?.value,
            //     userType: 0,
            //     avatarId: ""
            // }

            // const result = await this.service.register(data);
            // if (result.statusCode === 200) {
            //     Helpers.showAlert(Strings.SignUp.REGISTER_SUCCESSFULL, "success", async () => {
            //         this.showPageLoading();
            //         await signinRedirect();
            //         this.hidePageLoading();
            //     });
            // } else if (result.value.statusCode === Constants.ApiCode.VALIDATE) {
            //     let error = result.value.responseException.validationErrors[0].message.toString();
            //     if(error.startsWith("Email")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             email: {
            //                 ...this.model.email,
            //                 error: `Email '${this.model.email?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }
            //     else if(error.startsWith("Username")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             userName: {
            //                 ...this.model.userName,
            //                 error: `Tên tài khoản '${this.model.userName?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }else if(error.startsWith("Phone")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             phone: {
            //                 ...this.model.phone,
            //                 error: `Số điện thoại '${this.model.phone?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }else if(error.startsWith("E&P")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             phone: {
            //                 ...this.model.phone,
            //                 error: `Số điện thoại '${this.model.phone?.value}' đã tồn tại`
            //             },
            //             email: {
            //                 ...this.model.email,
            //                 error: `Email '${this.model.email?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }
            //     else if(error.startsWith("P&U")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             phone: {
            //                 ...this.model.phone,
            //                 error: `Số điện thoại '${this.model.phone?.value}' đã tồn tại`
            //             },
            //             userName: {
            //                 ...this.model.userName,
            //                 error: `Tên tài khoản '${this.model.userName?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }
            //     else if(error.startsWith("E&U")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             userName: {
            //                 ...this.model.userName,
            //                 error: `Tên tài khoản '${this.model.userName?.value}' đã tồn tại`
            //             },
            //             email: {
            //                 ...this.model.email,
            //                 error: `Email '${this.model.email?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }
            //     else if(error.startsWith("All")){
            //         this.hidePageLoading();
            //         this.setModel({
            //             phone: {
            //                 ...this.model.phone,
            //                 error: `Số điện thoại '${this.model.phone?.value}' đã tồn tại`
            //             },
            //             email: {
            //                 ...this.model.email,
            //                 error: `Email '${this.model.email?.value}' đã tồn tại`
            //             },
            //             userName: {
            //                 ...this.model.userName,
            //                 error: `Tên tài khoản '${this.model.userName?.value}' đã tồn tại`
            //             },
            //             renderKey: Date.now()
            //         })
            //         return
            //     }
            // }
            this.hidePageLoading();
        } catch (error: any) {
            this.hidePageLoading();
            // this.handleException(error);
            // if (error) {
            //     Helpers.showAlert(error.message.responseException.validationErrors[0].message || Strings.SignUp.REGISTER_ERROR, 'error')
            // }
        }
    }

    // onValidateInput() {
    //     var correct = true;
    //     if (Helpers.isNullOrEmpty(this.model.fullName?.value)) {
    //         this.setModel({
    //             fullName: {
    //                 error: Strings.Validation.REQUIRED_NAME
    //             }
    //         });
    //         correct = false;
    //     }
    //     if (Helpers.isNullOrEmpty(this.model.userName?.value)) {
    //         this.setModel({
    //             userName: {
    //                 error: Strings.Validation.REQUIRED_USERNAME
    //             }

    //         });
    //         correct = false;
    //     } else if (!Helpers.checkValidateUsername(this.model.userName?.value)) {
    //         this.setModel({
    //             userName: {
    //                 error: Strings.Validation.USERNAME
    //             }
    //         });
    //         correct = false;
    //     }

    //     // if (Helpers.isNullOrEmpty(this.model.email?.value)) {
    //     //     this.setModel({
    //     //         email: {
    //     //             error: Strings.Validation.REQUIRED_EMAIL
    //     //         }
    //     //     });
    //     //     correct = false;
    //     // } else 
    //     if (!Helpers.isNullOrEmpty(this.model.phone?.value) && !Helpers.checkValidateEmail(this.model.email?.value)) {
    //         this.setModel({
    //             email: {
    //                 error: Strings.Validation.EMAIL_ADDRESS
    //             }
    //         });
    //         correct = false;
    //     }
    //     if (Helpers.isNullOrEmpty(this.model.phone?.value)) {
    //         this.setModel({
    //             phone: {
    //                 error: Strings.Validation.REQUIRED_PHONE
    //             }
    //         });
    //         correct = false;
    //     } else if (!Helpers.checkValidatePhone(this.model.phone?.value)) {
    //         this.setModel({
    //             phone: {
    //                 error: Strings.Validation.PHONE_NUMBER
    //             }
    //         });
    //         correct = false;
    //     }

    //     if (Helpers.isNullOrEmpty(this.model.password?.value)) {
    //         this.setModel({
    //             password: {
    //                 error: Strings.Validation.REQUIRED_PASSWORD,
    //             }
    //         });
    //         correct = false;
    //     }

    //     if (this.model.password?.value.length < 6 || this.model.password?.value.length > 100) {
    //         this.setModel({
    //             password: {
    //                 error: "Mật khẩu chưa ít nhất 6 và nhiều nhất 100 kí tự"
    //             }
    //         });
    //         correct = false;
    //     }

    //     if (Helpers.isNullOrEmpty(this.model.confirmPassword?.value)) {
    //         this.setModel({
    //             confirmPassword: {
    //                 error: Strings.Validation.REQUIRED_CONFIRM_PASSWORD
    //             }
    //         });
    //         correct = false;
    //     } else if (this.model.password?.value !== this.model.confirmPassword?.value) {
    //         this.setModel({
    //             confirmPassword: {
    //                 error: Strings.Validation.NOT_SAME
    //             }
    //         });
    //         correct = false;
    //     }
    //     return correct;
    // }
}

export default SignUpController;