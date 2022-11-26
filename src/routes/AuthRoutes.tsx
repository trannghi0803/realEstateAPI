import React from "react";
import { Route, Switch } from "react-router-dom";
import { Screens } from "../constants";
// import { AuthRoute } from "../guards";
import { LoginView } from "../app/views/auth";
import AuthRoute from "../guards/AuthRoute";

export default function AuthRoutes() {
    return (
        <Switch>
            {/* <AuthRoute path={Screens.AUTH_LOGIN_2FA} component={Login2FAView} /> */}
            <Route path={Screens.AUTH_LOGIN}
                render={(p) => {
                    return (
                        <div className={"background-login"}>
                            <LoginView {...p} />
                        </div>
                    );
                }}
            />
        </Switch>
    );
}
