import React from "react";
import { History } from "history";
import { EventEmitter } from "events";
import { onSnapshot } from "mobx-state-tree";
import { CircularProgress } from "@material-ui/core";

import { Helpers } from "../../../commons/utils";
import { BaseController } from "../../controllers/base";
import { Constants, Screens, Strings } from "../../../constants";
import { ControlLoading } from "../../../components";
import { clearGlobalState, GlobalState, ModelStorage } from "../../../stores/GlobalState";
import { signoutRedirectCallback } from "../../../config";
interface IProps {
}
class BaseView<TController extends BaseController<{}, {}>, TModel, TService> extends React.Component<IProps> {

    public readonly className: string;
    public readonly controller: TController;
    public readonly model: TModel;
    public readonly service: TService;
    public readonly history: History;
    public readonly eventEmitter: EventEmitter;

    private mounted?: boolean;

    constructor(props: any, controllerClass: any, modelClass: any, serviceClass: any) {
        super(props);
        this.className = this.constructor.name;
        this.model = new modelClass();
        this.service = new serviceClass(this.model);
        this.controller = new controllerClass(props, this.model, this.service);
        this.history = props.history as History;
        this.controller.onHistoryChange(props.history);
        this.eventEmitter = __EventEmitter as EventEmitter;

        // Copy passProps to model
        Helpers.copyProperties(props, this.model);

        this.state = this.model;
        this.mounted = false;

        this.eventEmitter.addListener(Constants.EventName.TOKEN_EXPIRED, this.onTokenExpired)

        onSnapshot(ModelStorage, () => {
            this.mounted && this.setModel(ModelStorage.model);
        });
    }

    public goBack() {
        this.history.go(-1);
    }

    public componentWillMount() {
        GlobalState.hideLoading();
        GlobalState.hidePageLoading();
        this.controller.onBefore();
    }

    public componentDidMount() {
        this.mounted = true;
        this.controller.onStarted();
    }

    public componentDidUpdate() {
        this.controller.onUpdate();
    }

    public onTokenExpired = async () => {
        Helpers.showAlert(Strings.Message.EPR_TOKEN, "error", async () => {
            try {
                const result = await signoutRedirectCallback();
                if (result.error) {
                    return;
                }
                clearGlobalState();
                this.history.push(Screens.HOME);
            } catch (error: any) {
                if (error) {
                }
                const message = error.message.Message || Strings.Message.ERROR;
                Helpers.showAlert(message, "error");
            }
        });
    }

    public componentWillUnmount() {
        this.mounted = false;
        this.eventEmitter.removeListener(Constants.EventName.TOKEN_EXPIRED, this.onTokenExpired);
        this.controller.onStop();
    }


    /**
     * Update new data to model object
     *
     * @param {object} model Model data
     * @param {function} callback Updated callback function
     */
    public setModel = (model: TModel, callback?: (changed: boolean) => void) => {
        let isUpdate: boolean = false;
        if (!Helpers.isNullOrEmpty(model)) {
            for (const key in model) {
                if (this.model[key] !== model[key]) {
                    this.model[key] = model[key];
                    isUpdate = true;
                }
            }
            if (isUpdate) {
                this.controller.updateModel(model);
                this.setState(this.model, () => {
                    if (Helpers.isFunction(callback)) {
                        callback(isUpdate);
                    }
                });
                return;
            }
        }
        if (!isUpdate && Helpers.isFunction(callback)) {
            callback(isUpdate);
        }
    }

    public renderPage() {
        return <div></div>;
    }

    public renderLoading = () => {
        return (
            <div style={{
                position: "absolute",
                top: "50%",
                bottom: "50%",
                left: "50%",
                right: "50%"
            }}>
                <CircularProgress color="inherit" />
            </div>
        );
    }

    public render() {
        return (
            <div className="w-100 h-100"
                style={GlobalState.isShowLoading ? { position: "relative" } : {}}>
                {GlobalState.isShowLoading ? this.renderLoading() : this.renderPage()}
                {/* <ControlSnackbar payload={GlobalState.messagePayload} /> */}
                <ControlLoading visible={GlobalState.isShowPageLoading} />
            </div>
        );
    }
}


export default BaseView;
