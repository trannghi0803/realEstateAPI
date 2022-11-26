import { Constants } from "../../constants";
import BaseSevice from "./BaseService";

class NewsService extends BaseSevice {

    public getAll = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.NEWS,
        });
        return result.data;
    }

    public getDetail = async (id: string) => {
        const result = await this.api.get({
            path: `${Constants.ApiPath.NEWS}/${id}`,
        });
        return result.data;
    }

    public delete = async (id: string) => {
        const result = await this.api.delete({
            path: `${Constants.ApiPath.NEWS}/${id}`,
        });
        return result.data;
    }

    public create = async (data: any) => {
        const result = await this.api.post({
            path: `${Constants.ApiPath.NEWS}`,
            data
        });
        return result.data;
    }

    public update = async (data: any) => {
        const result = await this.api.put({
            path: `${Constants.ApiPath.NEWS}/${data.id}`,
            data
        });
        return result.data;
    }
}

export default NewsService;