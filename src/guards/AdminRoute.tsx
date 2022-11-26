import React from "react";
import {
    Redirect,
    Route,
    RouteProps,
} from "react-router-dom";
// import { AuthService } from "../app/services";
import { Screens } from "../constants";
import { AdminLayout } from "../layout";
import { GlobalState } from "../stores/GlobalState";
interface IProps extends RouteProps {
    component: any;
}
function AdminRoute(props: IProps) {
    const { component: Component, ...rest } = props;
    // const role = GlobalState.role;
    const isAuthenticated = GlobalState.isAuthenticated;
    return (
        <Route
            {...rest}
            render={(p) => {
                if ((!isAuthenticated)) {
                    const path = window.location.pathname;
                    GlobalState.setTargetScreen(path);
                    return <Redirect to={Screens.AUTH_LOGIN} />;
                }
                // else if((isAuthenticated) && (role !== UserType.Staff)){
                //     return (
                //         <div className="d-flex w-100 min-vh-100 justify-content-center align-items-center">
                //             <h2>404 | Page Not Found</h2>
                //         </div>
                //     );
                // }
                return (
                    <AdminLayout>
                        <Component {...p} />
                    </AdminLayout>
                );
            }}
        />
    );
}

export default AdminRoute;
