import { Helpers } from "../../../commons/utils";
import userManager, { signinRedirect } from "../../../config";
import { Constants, Screens } from "../../../constants";
import { clearGlobalState, GlobalState } from "../../../stores/GlobalState";
import { AuthModel } from "../../models";
import { AuthService } from "../../services";
import { BaseController } from "../base";

class LoginRedirectController extends BaseController<AuthModel, AuthService> {

    constructor(props: any) {
        super(props, AuthModel, AuthService);
    }

    public async onStarted() {
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        if (searchParams.get("code") ||
            searchParams.get("id_token") ||
            searchParams.get("session_state") ||
            hashParams.get("code") ||
            hashParams.get("id_token") ||
            hashParams.get("session_state")) {
                userManager.events.addUserLoaded((user) => this.userLoaded(user, this));
                let user = await userManager.getUser();
                if (user) {
                    this.userLoaded(user, this);
                } else {
                    try {
                        user = await userManager.signinCallback();
                    } catch (error) {
                        this.history.push(Screens.HOME);
                    }
                }
        } else {
            await signinRedirect();
        }
    }
    public userLoaded = async (user: any, self: any) => {
        try {
            if (user) {
                GlobalState.setUser(user);
                GlobalState.setAuthenticateStatus(true);
                // const profile = await this.service.UserInfo();
                // sessionStorage.setItem(Constants.StorageKeys.MENU_INDEX, "1");
                // if (profile.userType === UserType.Accountant ) {
                //     GlobalState.setRole(profile.userType);
                //     GlobalState.setRetailAuthenticatedStatus(true);
                //     this.history.push(Screens.HOME);
                // } else if (profile.userType === UserType.Staff) {
                //     GlobalState.setRetailAuthenticatedStatus(true); 
                //     GlobalState.setRole(profile.userType);
                //     this.history.push(Screens.ADMIN_PROVIDER);
                // } else {
                //     GlobalState.setRole(profile.userType);
                //     GlobalState.setRetailAuthenticatedStatus(true);
                //     if(profile){
                //         GlobalState.setPartnerId(profile?.partnerAccounts?.[0]?.partnerId);
                //         if(profile?.partnerAccounts?.length > 1){
                //             this.history.push(Screens.RETAIL_PARTNER); 
                //         }else{
                //             this.history.push(Screens.RETAIL_DELIVERY); 
                //         }
                //     }
                // }
            }
        } catch (error) {
            Helpers.showAlert("Xử lý đăng nhập không thành công. Xin vui lòng đăng nhập lại.",
                "error",
                async () => {
                    clearGlobalState();
                    await signinRedirect();
                });
        }
    }
}

export default LoginRedirectController;
// function jwt_decode(access_token: any): any {
//     throw new Error("Function not implemented.");
// }

