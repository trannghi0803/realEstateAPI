import { Constants } from "../../constants";
import BaseSevice from "./BaseService";

class StatisticService extends BaseSevice {

    public countRealEstateByCategory = async (data?: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.COUNT_BY_CATEGORY,
            query: data
        });
        return result.data;
    }

    public countRealEstateByRegion = async (data?: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.COUNT_BY_REGION,
            query: data
        });
        return result.data;
    }

    public countAreaByCategory = async (data?: any) => {
        const result = await this.api.get({
            path: Constants.ApiPath.COUNT_AREA_BY_CATEGORY,
            query: data
        });
        return result.data;
    }

    public countByMonthCreateTime = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.COUNT_BY_CREATE_TIME
        });
        return result.data;
    }
}

export default StatisticService;