import BaseModel from "./BaseModel";
import { ICodename, IInput } from "../../commons/utils";
import { Constants } from "../../constants";
import { Status } from "../../constants/Enums";

interface IAddress {
    provinceName?: string;
    districtName?: string;
    wardName?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    addressLine?: string;
}

class RealEstateModel extends BaseModel {

    public pageNumber?: number
    public totalPages?: number;
    public totalCount?: number;
    public pageSize?: number = Constants.ROW_PER_PAGE;
    public searchText?: string;

    public id?: string;
    public title?: IInput;
    public price?: IInput;
    public area?: IInput;
    public description?: string;
    public attributes?: IInput;
    public images?: any[] = [];
    public category?: IInput;
    public type?: number;
    public isHighLight?: number;
    public status?: number;

    public isLoadingImages?: boolean;
    
    public categoryList?: any[] = [];
    public realEstateList?: any[] = [];
    public provinceList?: ICodename[];
    public districtList?: ICodename[];
    public wardList?: ICodename[];
    public address?: IAddress;

    categoryFilter?: string;
    statusList?: ICodename[] = [
        {
            code: `${Status.Active}`,
            name: "Đã đăng"
        },
        {
            code: `${Status.Inactive}`,
            name: "Đang chờ duyệt"
        },
        {
            code: `${Status.Reject}`,
            name: "Từ chối"
        }
    ];
    statusFilter?: number | string;
    provinceFilter?: string;
}

export default RealEstateModel;