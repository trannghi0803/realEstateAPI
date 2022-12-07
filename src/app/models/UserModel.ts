import BaseModel from "./BaseModel";
import { IInput, IStaff } from "../../commons/utils";
import { Constants } from "../../constants";
class UserModel extends BaseModel {
    public staff?: IStaff;
    public regionName?: string;
    public zoneName?: string;

    isShowModal?: boolean;
    public dataChangePW?: {
        phoneNumber?: IInput,
        newPassword?: IInput,
        oldPassword?: IInput,
    }

    public pageNumber?: number
    public totalPages?: number;
    public totalCount?: number;
    public pageSize?: number = Constants.ROW_PER_PAGE;
    public searchText?: string;

    public userList?: any[]=[];
    userName?: IInput;
    email?: IInput;
    phoneNumber?: IInput;
    avatar?: any
    id?: string;
    imgUrl?: any;
    status?: string;
    role?: number;
    imageDisplay?: any;
}

export default UserModel;