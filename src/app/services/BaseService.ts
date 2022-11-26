import { Constants } from "../../constants";
import { signoutRedirectCallback } from "../../config";
import APIAccessor from "../../commons/api/APIAccessor";

class BaseService {
    public readonly api = APIAccessor;

    public onLogout = async () => {
        try {
            const result = await signoutRedirectCallback();
            if (result.error) {
                return { status: false };
            }
            return { status: true };
        } catch (error) {
            return { status: false };
        }
    }

    public uploadImage = async (file: File) => {
        // const newName = `${new Date().getTime()}.jpeg`
        const form_data = new FormData();
        form_data.append('file', file, file.name);

        const result = await this.api.postFormData({
            path: Constants.ApiPath.UPLOAD_FILE,
            data: form_data
        });
        return result.data;
    }

    public getProvince = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.ADDRESS.GET_PROVINCE,
        });
        return result.data;
    }

    public getDistrictsByCityCode = async (code: string) => {
        const result = await this.api.get({
            path: Constants.ApiPath.ADDRESS.GET_DISTRICT_BY_PROVINCE + `${code}`,
        })
        return result.data;
    }

    public getWardByDistrictCode = async (code: string) => {
        const result = await this.api.get({
            path: Constants.ApiPath.ADDRESS.GET_WARD_BY_DISTRICT + `${code}`,
        })
        return result.data;
    }

}
export default BaseService;