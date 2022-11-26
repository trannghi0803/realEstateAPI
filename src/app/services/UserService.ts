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

}

export default UserService;