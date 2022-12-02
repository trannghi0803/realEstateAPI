import { BaseController } from "../base";
import { Helpers, ICodename } from "../../../commons/utils";
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
            console.log("first", query.get('status'))
            this.setModel({
                totalCount: GlobalState.totalCount || 0,
                searchText: query.get('searchText') || undefined,
                categoryFilter: query.get('category') || undefined,
                statusFilter: query.get('status') || undefined,
                provinceFilter: query.get('province') || undefined,
                pageNumber: Number(page),
                pageSize: Number(pageSize),
            })
            await this.getCityList()
            await this.getPaged();
            await this.getCategory();
        } catch (error) {

        }
    }

    getCityList = async () => {
        try {
            // this.showPageLoading()
            const provinceResult = GlobalState.cityList;
            const provinceList: ICodename[] = [];
            provinceResult?.forEach((city: any) => {
                provinceList.push({
                    id: city._id,
                    code: city.Code,
                    group: "province",
                    name: city.Name,
                });
            });
            // this.hidePageLoading();
            this.setModel({
                provinceList
            });
        } catch (error) {
            // this.hidePageLoading();
            this.handleException(error);
        }
    }


    handleChangePage = async (pageNumber: number, pageSize: number) => {
        const page = Math.ceil((this.model.totalCount || 0) / (pageSize || 1)) || 1;
        const pageNumberTemp = (pageNumber || 1) >= page ? page : (pageNumber || 1);
        this.setModel({
            pageNumber: pageNumberTemp,
            pageSize
        })
        await this.getPaged()
    }

    public getPaged = async () => {
        try {
            this.showPageLoading();
            // console.log("provinceFilter", this.model.provinceFilter)
            let provinceName = this.model.provinceList?.find(el => el.code === this.model.provinceFilter)?.name || ""
            let data: any = {
                pageNumber: this.model.pageNumber,
                pageSize: this.model.pageSize,
                title: this.model.searchText || undefined,
                category: this.model.categoryFilter || undefined,
                status: (this.model.statusFilter) || undefined,
                provinceName: provinceName || undefined,
            }
            const result = await this.service.getPaged(data);
            console.log("data", data)
            let totalCount = 0;
            // let realEstateList: any = [];
            // result?.result?.map((el: any, i: number) => {
            //     if (!Helpers.isNullOrEmpty(this.model.searchText) || this.model.statusFilter !== undefined
            //         || !Helpers.isNullOrEmpty(this.model.categoryFilter) || !Helpers.isNullOrEmpty(this.model.provinceFilter)) {
            //         totalCount = result?.result?.length
            //         // console.log("if", totalCount)
            //     }
            //     realEstateList.push(el)
            // })
            //result?.result?.length === 0 && (totalCount = 0);
            this.setModel({
                realEstateList: result?.result || [],
                totalCount: result.totalCount,
                pageNumber: result.pageNumber,
                pageSize: result.pageSize,
            })
            let queryString = `&page=${this.model.pageNumber || 1}&pageSize=${this.model.pageSize || Constants.ROW_PER_PAGE}`;
            if (!Helpers.isNullOrEmpty(this.model.searchText)) { queryString += `&searchText=${this.model.searchText}` }
            if (!Helpers.isNullOrEmpty(this.model.categoryFilter)) { queryString += `&category=${this.model.categoryFilter}` }
            if (!Helpers.isNullOrEmpty(this.model.statusFilter)) { queryString += `&status=${this.model.statusFilter}` }
            if (!Helpers.isNullOrEmpty(this.model.provinceFilter)) { queryString += `&province=${this.model.provinceFilter}` }
            this.history.replace({
                pathname: Screens.ADMIN_REAL_ESTATE,
                search: queryString
            });
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
                    code: el._id,
                })
            })
            this.setModel({
                categoryList
            })
        } catch (error) {
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

    approve = (id: string) => {
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_APPROVE, async () => {
            try {
                this.showPageLoading();
                const result = await this.service.approve(id);
                Helpers.showAlert(Strings.Message.APPROVE_SUCCESS, "success");
                this.getPaged();
                this.hidePageLoading()
            } catch (error) {
                Helpers.showAlert(Strings.Message.ACTION_ERR, "error");
                // this.handleException(error)
                this.hidePageLoading()
            }
        })
    }

    reject = (id: string) => {
        Helpers.showConfirmAlert(Strings.Message.CONFIRM_REJECT, async () => {
            try {
                this.showPageLoading();
                const result = await this.service.reject(id);
                Helpers.showAlert(Strings.Message.REJECT_SUCCESS, "success");
                this.getPaged();
                this.hidePageLoading()
            } catch (error) {
                Helpers.showAlert(Strings.Message.ACTION_ERR, "error");
                // this.handleException(error)
                this.hidePageLoading()
            }
        })
    }

}
export default RealEstateListController;