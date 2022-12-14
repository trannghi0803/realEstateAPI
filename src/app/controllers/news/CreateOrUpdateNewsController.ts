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
                imageThumb: data.imageThumb,
                imageDisplay: [data.imageThumb],
                slug: data.slug,
                type: data.type,
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
                content: this.model.content?.value,
                imageThumb: this.model.imageThumb
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

    handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                this.showPageLoading();
                var photos: any[] = [];
                photos.push(...(this.model.imageThumb || []));
                for (let i = 0; i < e.target.files.length; i++) {
                    if ((e.target.files[i].size / 1048576) > 2) {
                        Helpers.showAlert("H??nh " + e.target.files[i].name + " ???? v?????t qu?? 2mb. vui l??ng ch???n h??nh kh??c!");
                        e.target.value = '';
                        return
                    }
                    if (e.target.files[i].type !== "image/png" && e.target.files[i].type !== "image/gif" && e.target.files[i].type !== "image/jpeg") {
                        Helpers.showAlert("File " + e.target.files[i].name + " Kh??ng ????ng ?????nh d???ng h??nh ???nh cho ph??p!");
                        e.target.value = '';
                        return
                    } else {
                        // if ((e.target.files[i].size / 1048576) > 1) {
                        console.time("res")
                        const fileId: any = await this.service.uploadImage(e.target.files[i]);
                        // console.log("fileId", fileId);
                        photos.push(
                            // {
                            //     photoId: URL.createObjectURL(e.target.files[i]),
                            //     displayOrder: 0,
                            //     photo: {
                            //         fileId: fileId.public_id,
                            //         url: fileId.url
                            //     }
                            // }
                            fileId.url
                        );
                        console.timeEnd("res")
                    }
                }

                this.setModel({
                    imageDisplay: photos,
                    imageThumb: photos[0],
                })
                this.hidePageLoading();
            }
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            Helpers.showAlert(`${error}`);
        }
    }

    handleDeletePhoto = (index: number, id?: string) => {
        this.setModel({
            imageDisplay: [],
            imageThumb: undefined,
        })
    }
}
export default CreateOrUpdateNewsController;