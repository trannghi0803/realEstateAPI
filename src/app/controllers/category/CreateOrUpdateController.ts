import moment from "moment";
import { BaseController } from "../base";
import { CategoryModel } from "../../models";
import { CategoryService } from "../../services";
import { Helpers } from "../../../commons/utils";
import { Strings } from "../../../constants";

class CreateOrUpdateController extends BaseController<CategoryModel, CategoryService> {
    constructor(props: any) {
        super(props, CategoryModel, CategoryService);
    }

    async onStarted() {
        try {
            this.showPageLoading();
            let { id } = this.getUrlParams(["id"]);
            if (id) {
                await this.getDetail(id);
            }
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }

    getDetail = async (id: string) => {
        try {
            this.showPageLoading();
            const data = await this.service.getDetail(id);
            this.setModel({
                id: data._id,
                name: { value: data.name },
                description: data.description,
                type: { value: data.type },
                renderKey: Date.now()
            })

            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }

    isCheckValidate() {
        let checked = true;
        if (Helpers.isNullOrEmpty(this.model.name?.value)) {
            this.setModel({
                name: { error: Strings.Validation.REQUIRED }
            })
            checked = false
        }
        if (Helpers.isNullOrEmpty(this.model.type?.value)) {
            this.setModel({
                type: { error: Strings.Validation.REQUIRED }
            })
            checked = false
        }

        return checked;
    }
    onCreateOrUpdateCategory = async () => {
        try {
            if (!this.isCheckValidate()) {
                return;
            }
            this.showPageLoading();
            let data: any = {
                type: Number(this.model.type?.value),
                name: this.model.name?.value,
                description: this.model.description
            }
            let result: any;
            if (Helpers.isNullOrEmpty(this.model.id)) {
                result = await this.service.create(data);
                console.log(result, result)
                Helpers.showAlert(Strings.Message.CREATE_SUCCESS, 'success')
            } else {
                data.id = this.model.id;
                result = await this.service.update(data);
                Helpers.showAlert(Strings.Message.UPDATE_SUCCESS, 'success')
            }
            this.history.goBack();
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            this.handleException(error);
        }
    }
}
export default CreateOrUpdateController;