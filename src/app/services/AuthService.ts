import BaseSevice from "./BaseService";
import { Constants } from "../../constants";

class AuthService extends BaseSevice {
    public login = async (data: any) => {
        const result = await this.api.post({
            path: Constants.ApiPath.LOGIN,
            data
        });
        return result.data;
    }

    public logout = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.LOGOUT,
        });
        return result.data;
    }

    public refreshToken = async (data: any) => {
        const result = await this.api.post({
            path: Constants.ApiPath.REFRESH_TOKEN,
            data
        });
        return result.data;
    }

    public getUserInfo = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.GET_USER_INFO
        })

        return result.data.result;
    }

    public checkAccount = async (phone: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.CHECK_ACCOUNT + `/${phone}`,
        });
        return result.data.result;
    }

}

export default AuthService;