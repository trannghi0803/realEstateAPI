import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

import { BaseController } from "../base";
import { AuthModel } from "../../models";
import { AuthService } from "../../services";
import { clearGlobalState, GlobalState } from "../../../stores/GlobalState";
import { Helpers, IUserInfo } from "../../../commons/utils";
import { Constants, Screens, Strings } from "../../../constants";
import BaseService from '../../services/BaseService';
import { UserType } from '../../../constants/Enums';

class LoginController extends BaseController<AuthModel, AuthService> {
    constructor(props: any) {
        super(props, AuthModel, AuthService);
    }

    public onStarted = async () => {
        this.showPageLoading();
        // const cookies = new Cookies();
        // const token = cookies.get(Constants.StorageKeys.TOKEN);
        GlobalState.setAuthenticateStatus(false);
        GlobalState.setUser(undefined)
        GlobalState.setUserInfo(undefined)
        GlobalState.setResources(undefined)

        sessionStorage.clear();
        // clearGlobalState();
        const token = GlobalState.user;

        if (token) {
            const targetScreen = (Helpers.isNullOrEmpty(GlobalState.targetScreen)) ? Screens.PROFILE : (GlobalState.targetScreen === "/") ? Screens.PROFILE : GlobalState.targetScreen;
            this.history.push(targetScreen);
        } else {
            this.history.push(Screens.AUTH_LOGIN)
        }
        this.hidePageLoading();
    }

    async login() {
        try {
            const vaidate = this.onValidateEmail();
            if (!vaidate) { return }
            this.showPageLoading();

            const data = {
                email: this.model.email?.value,
                password: this.model.password?.value
                // email: 'tranvannghi1998@gmail.com',
                // password: 'nghi1234'
            }
            const result = await this.service.login(data);
            if (result.statusCode === 200) {
                const user = {
                    accessToken: result.accessToken,
                    //refreshToken: result.result.refreshToken,
                };
                // await this.userLoaded(user);
                const cityList = await this.service.getProvince();
                GlobalState.setCityList(cityList);
                GlobalState.setUser(user);
                GlobalState.setAuthenticateStatus(true);
                GlobalState.setUserInfo(result.user);

                if (result.user?.role === UserType.User) {
                    const result = await new AuthService().logout();
                    
                        GlobalState.setAuthenticateStatus(false);
                        sessionStorage.clear();
                        // remove cookie 
                        // const cookies = new Cookies();
                        // cookies.remove(Constants.StorageKeys.FCM_TOKEN, { path: '/' });
                        // cookies.remove(Constants.StorageKeys.TOKEN, { path: '/' });
                        // clear Global State
                        clearGlobalState();
                        Helpers.showAlert("Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên để được hổ trợ!", "warning");
                    
                }

                const targetScreen = (Helpers.isNullOrEmpty(GlobalState.targetScreen)) ? Screens.PROFILE : (GlobalState.targetScreen === "/") ? Screens.PROFILE : GlobalState.targetScreen;
                this.history.push(targetScreen);

            } else {
                console.log("result", result);
            }
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            this.handleException(error);
        }

    }

    onValidateEmail() {
        var correct = true;
        if (Helpers.isNullOrEmpty(this.model.email?.value)) {
            this.setModel({
                email: {
                    error: Strings.Validation.REQUIRED
                }
            });
            correct = false;
        } else if (!Helpers.checkValidateEmail(this.model.email?.value)) {
            this.setModel({
                email: {
                    error: Strings.Validation.EMAIL_ADDRESS
                }
            });
            correct = false;
        }

        return correct;
    }



    public onRegister = async () => {
        this.history.push(Screens.SIGN_UP)
    }

}

export default LoginController;