import BaseModel from "./BaseModel";
import { ICodename, IInput } from "../../commons/utils";
import { Constants } from "../../constants";
import { CategoryType } from "../../constants/Enums";

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
    public realEstateByCategoryType?: IInput
    
    public realEstateByRegionTimeStart?: any;
    public realEstateByRegionTimeEnd?: any;

    public areaByCategoryTimeStart?: any;
    public areaByCategoryTimeEnd?: any;


    public typeList?: ICodename[] = [
        {
            code: `${CategoryType.Sell}`,
            name: "Nhà đất bán"
        },
        {
            code: `${CategoryType.Rent}`,
            name: "Nhà đất cho thuê"
        }
    ]
}

export default StatisticModel;