import { History } from "history";
import { Constants, Strings } from "../../../constants";
import { Helpers, IActionResourceCode } from "../../../commons/utils";
import { GlobalState, ModelStorage } from "../../../stores/GlobalState";

class BaseController<TModel, TService> {
    public model: TModel;
    public readonly service: TService;
    public history: History;

    constructor(props: any, model: any, service: any) {
        this.model = new model();
        this.service = new service();
        this.history = {} as History;
        Helpers.copyProperties(props, this.model);
    }

    public onHistoryChange(history: any) {
        this.history = history;
    }

    public onDidFocus() { }

    public onBefore() { }

    public onStarted() { }

    public onStop() { }

    public onUpdate() { }
    /**
     * Update only a property to model object.
     * If model object contains more than one property, a runtime error will occur.
     *
     * @param {object} model Model data
     */
    public setModel = (model: TModel) => {
        // call setModel for set model to global
        this.updateModel(model);
        ModelStorage.setModel(model);
    }

    public updateModel = (model: TModel) => {
        for (const key in model) {
            if (this.model[key] !== model[key]) {
                this.model[key] = model[key];
            }
        }
    }

    public eventListener = () => {
    }

    public evenRemovetListener = () => {
    }

    public showLoading = () => {
        GlobalState.showLoading();
    }

    public hideLoading = () => {
        GlobalState.hideLoading();
    }

    public showPageLoading = () => {
        GlobalState.showPageLoading();
    }

    public hidePageLoading = () => {
        GlobalState.hidePageLoading();
    }

    public handleException = async (error?: any) => {
        // if (error) {

        // }
        // let mesErr = undefined;
        
        const message = error.message.msg || Strings.Message.ERROR;

        Helpers.showAlert(message, "error");
    }

    public getUrlParams = (keys: string[]): { [key: string]: string | undefined } => {
        const params = new URLSearchParams(window.location.search);
        let datas: { [key: string]: string | undefined } = {};
        keys.forEach((key) => {
            datas[key] = params.get(key) || undefined
        });
        return datas;
    }

    public addBreadcrumb = (title: string) => {
        const currentUrl = this.history.location;
        const lastBreadcrumbs = (GlobalState.breadcrumbs && GlobalState.breadcrumbs.length > 0)
            ? GlobalState.breadcrumbs[GlobalState.breadcrumbs.length - 1] : {};
        if (lastBreadcrumbs?.title !== title) {
            GlobalState.setBreadcrumbs([
                ...GlobalState.breadcrumbs,
                {
                    title,
                    link: currentUrl.pathname + currentUrl.search,
                }
            ])
        }
    }

    public updateLastBreadcrumb = () => {
        const currentUrl = this.history.location;
        const lastIndex = GlobalState.breadcrumbs?.length - 1;
        if (lastIndex > -1) {
            const item = {
                title: GlobalState.breadcrumbs[lastIndex].title,
                link: currentUrl.pathname + currentUrl.search
            }
            let newBreadcrumbs: any[] = [];
            GlobalState.breadcrumbs?.forEach((element: any, index: number) => {
                if (index === lastIndex) {
                    newBreadcrumbs.push(item);
                } else {
                    newBreadcrumbs.push(element);
                }
            });
            GlobalState.setBreadcrumbs(newBreadcrumbs);
        }
    }
}

export default BaseController;
