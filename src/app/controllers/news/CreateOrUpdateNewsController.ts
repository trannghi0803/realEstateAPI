import moment from "moment";
import { BaseController } from "../base";
import { CategoryService, NewsService } from "../../services";
import { Helpers, ICodename } from "../../../commons/utils";
import { Strings } from "../../../constants";
import { GlobalState } from "../../../stores/GlobalState";
import { RealEstateType } from "../../../constants/Enums";
import { NewsModel } from "../../models";

class CreateOrUpdateNewsController extends BaseController<NewsModel, NewsService> {
    constructor(props: any) {
        super(props, NewsModel, NewsService);
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
                title: { value: data.title },
                abstract: { value: data.abstract },
                content: { value: data.content},
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
        if (Helpers.isNullOrEmpty(this.model.title?.value)) {
            this.setModel({
                title: { error: Strings.Validation.REQUIRED }
            })
            checked = false
        }

        return checked;
    }

    onCreateOrUpdateNews = async () => {
        try {
            if (!this.isCheckValidate()) {
                return;
            }
            this.showPageLoading();

            let data: any = {
                title: this.model.title?.value,
                abstract: this.model.abstract?.value,
                content: this.model.content?.value
            }
            console.log("data", data);
            let result: any;
            if (Helpers.isNullOrEmpty(this.model.id)) {
                result = await this.service.create(data);
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
export default CreateOrUpdateNewsController;