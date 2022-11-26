import BaseModel from "./BaseModel";
import { IInput } from "../../commons/utils";

class AuthModel extends BaseModel {
    email?: IInput;
    password?: IInput;
    
}

export default AuthModel;