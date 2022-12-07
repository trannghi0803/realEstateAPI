import BaseModel from "./BaseModel";
import { ICodename, IInput } from "../../commons/utils";
import { Constants } from "../../constants";

interface IAddress {
    provinceName?: string;
    districtName?: string;
    wardName?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    addressLine?: string;
}

class NewsModel extends BaseModel {

    public pageNumber?: number
    public totalPages?: number;
    public totalCount?: number;
    public pageSize?: number = Constants.ROW_PER_PAGE;
    public searchText?: string;

    public id?: string;
    public title?: IInput;
    public abstract?: IInput;
    public content?: IInput;
    public imageThumb?: any;
    public imageDisplay?: any;
    public type?: number;
    public slug?: string;
    
    public newsList?: any[] = [];
}

export default NewsModel;