import BaseModel from "./BaseModel";
import { ICodename, IInput } from "../../commons/utils";
import { Constants } from "../../constants";

class StatisticModel extends BaseModel {

    public pageNumber?: number
    public totalPages?: number;
    public totalCount?: number;
    public pageSize?: number = Constants.ROW_PER_PAGE;
    public searchText?: string;

    public data?: any[] = [];
    public realEstateByCategoryList?: any[] = [];
    public realEstateByRegionList?: any[] = [];
    public areaByCategoryList?: any[] = [];
    public realEstateByMonthList?: any[] = [];

    public realEstateByCategoryTimeStart?: any;
    public realEstateByCategoryTimeEnd?: any;

    public realEstateByRegionTimeStart?: any;
    public realEstateByRegionTimeEnd?: any;

    public areaByCategoryTimeStart?: any;
    public areaByCategoryTimeEnd?: any;
}

export default StatisticModel;