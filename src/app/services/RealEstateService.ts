import { Constants } from "../../constants";
import BaseSevice from "./BaseService";

class RealEstateService extends BaseSevice {

    public getAll = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.REAL_ESTATE,
        });
        return result.data;
    }

    public getDetail = async (id: string) => {
        const result = await this.api.get({
            path: `${Constants.ApiPath.REAL_ESTATE}/${id}`,
        });
        return result.data;
    }

    public delete = async (id: string) => {
        const result = await this.api.delete({
            path: `${Constants.ApiPath.REAL_ESTATE}/${id}`,
        });
        return result.data;
    }

    public create = async (data: any) => {
        const result = await this.api.post({
            path: `${Constants.ApiPath.REAL_ESTATE}`,
            data
        });
        return result.data;
    }

    public update = async (data: any) => {
        const result = await this.api.put({
            path: `${Constants.ApiPath.REAL_ESTATE}/${data.id}`,
            data
        });
        return result.data;
    }
}

export default RealEstateService;