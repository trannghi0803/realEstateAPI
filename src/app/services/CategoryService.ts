import { Constants } from "../../constants";
import BaseSevice from "./BaseService";

class CategoryService extends BaseSevice {

    public getAll = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.Category,
        });
        return result.data;
    }

    public getPaged = async (data: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.CATEGORY_GET_PAGED,
            query: data
        });
        return result.data;
    }

    public getDetail = async (id: string) => {
        const result = await this.api.get({
            path: `${Constants.ApiPath.Category}/${id}`,
        });
        return result.data;
    }

    public delete = async (id: string) => {
        const result = await this.api.delete({
            path: `${Constants.ApiPath.Category}/${id}`,
        });
        return result.data;
    }

    public create = async (data: any) => {
        const result = await this.api.post({
            path: `${Constants.ApiPath.Category}`,
            data
        });
        return result.data;
    }

    public update = async (data: any) => {
        const result = await this.api.put({
            path: `${Constants.ApiPath.Category}/${data.id}`,
            data
        });
        return result.data;
    }
}

export default CategoryService;