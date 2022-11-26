import React from "react";
import { observer } from "mobx-react";
import { CircularProgress } from "@material-ui/core";
import BaseView from "../base/BaseView";
import { AuthModel } from "../../models";
import { AuthService } from "../../services";
import { LoginRedirectController } from "../../controllers/auth";
@observer
export default class LoginRedirectView extends BaseView<LoginRedirectController, AuthModel, AuthService> {
    constructor(props: any) {
        super(props, LoginRedirectController, AuthModel, AuthService);
    }

    public renderPage() {
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
}
