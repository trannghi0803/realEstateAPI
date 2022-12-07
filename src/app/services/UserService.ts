import { Constants } from "../../constants";
import BaseSevice from "./BaseService";

class UserService extends BaseSevice {

    public changePassword = async (data: any) => {
        const result = await this.api.post({
            path: Constants.ApiPath.CHANGE_PASSWORD,
            data: data,
        });
        return result.data;
    }

    public getPaged = async (data?: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.User,
            data
        });
        return result.data;
    }

    public getDetail = async (id: string) => {
        const result = await this.api.get({
            path: `${Constants.ApiPath.USER_DETAIL}/${id}`,
        });
        return result.data;
    }

    public createUser = async (data: any) => {
        const result = await this.api.post({
            path: Constants.ApiPath.USER_CREATE,
            data
        });
        return result.data;
    }

    public updateUser = async (data: any) => {
        const result = await this.api.put({
            path: `${Constants.ApiPath.USER_UPDATE}/${data?.id}`,
            data
        });
        return result.data;
    }

    public deleteUser = async (id: string) => {
        const result = await this.api.delete({
            path: `${Constants.ApiPath.USER_DELETE}/${id}`,
        });
        return result.data;
    }

}

export default UserService;