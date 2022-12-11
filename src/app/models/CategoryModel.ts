import { CategoryType } from './../../constants/Enums';
import BaseModel from "./BaseModel";
import { ICodename, IInput } from "../../commons/utils";
import { Constants } from "../../constants";

class CategoryModel extends BaseModel {

    public pageNumber?: number
    public totalPages?: number;
    public totalCount?: number;
    public pageSize?: number = Constants.ROW_PER_PAGE;
    public searchText?: string;

    public id?: string;
    public description?: string;
    public name?: IInput;
    public type?: IInput;
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
    public categoryList?: any[] = []
    public typeFilter?: IInput
}

export default CategoryModel;