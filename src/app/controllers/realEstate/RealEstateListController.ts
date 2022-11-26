import { BaseController } from "../base";
import { Helpers } from "../../../commons/utils";
import { GlobalState } from "../../../stores/GlobalState";
import { Constants, Screens, Strings } from "../../../constants";
import RealEstateModel from "../../models/RealEstateModel";
import { CategoryService, RealEstateService } from "../../services";

class RealEstateListController extends BaseController<RealEstateModel, RealEstateService> {
    constructor(props: any) {
        super(props, RealEstateModel, RealEstateService);
    }

    async onStarted() {
        try {
            const { page = '1' } = this.getUrlParams(["page"]);
            const { pageSize = '10' } = this.getUrlParams(["pageSize"]);
            const params = window.location.search;
            let query = new URLSearchParams(params);
            this.setModel({
                totalCount: GlobalState.totalCount || 0,
                searchText: query.get('searchText') || undefined,
                pageNumber: Number(page),
                pageSize: Number(pageSize),
            })
            await this.getPaged();
            await this.getCategory();
        } catch (error) {

        }
    }

    public getPaged = async () => {
        try {
            this.showPageLoading();

            const result = await this.service.getAll();
            let realEstateList: any = [];
            let totalCount = 0;
            result?.map((el: any, i: number) => {
                
                realEstateList.push({...el, id: el._id})
                totalCount++;
            })
            this.setModel({
                realEstateList,
                totalCount
            })

            this.hidePageLoading();

        } catch (error) {
            this.handleException(error);
            await Helpers.showAlert(Strings.Message.ERROR, "error");
            this.hidePageLoading();
        }
    }

    getCategory = async () => {
        try {
            const result = await new CategoryService().getAll();
            let categoryList: any = [];
            result?.map((el: any, i: number) => {
                categoryList.push({
                    id: el._id,
                    name: el.name,
                    type: el.type,
                    description: el.description,
                })
            })
            this.setModel({
                categoryList
            })
        } catch(error) {
            this.handleException(error);
            await Helpers.showAlert(Strings.Message.ERROR, "error");
            this.hidePageLoading();
        }
    }

    deleteRealEstate = (id: string) => {
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_DELETE, async () => {
            try {
                this.showPageLoading();
                const result = await this.service.delete(id);
                if (result.statusCode === Constants.ApiCode.SUCCESS) {
                    Helpers.showAlert(Strings.Message.DELETE_SUCCESS, "success");
                    this.getPaged();
                } else {
                    Helpers.showAlert(Strings.Message.DELETE_ERROR, "error")
                }
                this.hidePageLoading()
            } catch (error) {
                this.handleException(error)
                this.hidePageLoading()
            }
        })
    }

}
export default RealEstateListController;