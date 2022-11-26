import React from "react";
import {
    Route,
    Redirect,
    RouteProps,
} from "react-router-dom";
import { Screens } from "../constants";
import { GlobalState } from "../stores/GlobalState";
interface IProps extends RouteProps {
    component: any;
}
function AuthRoute(props: IProps) {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(p) => {
                const isAuthenticated = GlobalState.isAuthenticated;
                if (isAuthenticated) {
                    return <Redirect to={Screens.HOME} />;
                }
                return (
                    <div className="background-login">
                        <Component {...p} />
                    </div>
                );
            }}
        />
    );
}

export default AuthRoute;