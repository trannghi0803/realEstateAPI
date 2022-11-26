import React from "react";
import { Switch } from "react-router-dom";

import { Screens } from "../constants";
import AdminRoute from "../guards/AdminRoute";
import { ProflieView, UserListView } from "../app/views/user";
import { CategoryListView, CreateOrUpdateCategoryView } from "../app/views/category";
import { RealEstateListView, CreateOrUpdateRealEstateView } from "../app/views/realEstate";
import { NewsListView, CreateOrUpdateNewsView } from "../app/views/news";

export default function MainRoutes() {
    return (
        <Switch>
            <AdminRoute exact path={Screens.HOME} component={ProflieView} />
            <AdminRoute exact path={Screens.PROFILE} component={ProflieView} />

            <AdminRoute exact path={Screens.ADMIN_USER} component={UserListView} />

            <AdminRoute exact path={Screens.ADMIN_CATEGORY} component={CategoryListView} />
            <AdminRoute exact path={Screens.CREATE_UPDATE_CATEGORY} component={CreateOrUpdateCategoryView} />

            <AdminRoute exact path={Screens.ADMIN_REAL_ESTATE} component={RealEstateListView} />
            <AdminRoute exact path={Screens.CREATE_UPDATE_REAL_ESTATE} component={CreateOrUpdateRealEstateView} />

            <AdminRoute exact path={Screens.ADMIN_NEWS} component={NewsListView} />
            <AdminRoute exact path={Screens.CREATE_UPDATE_NEWS} component={CreateOrUpdateNewsView} />

            {/* <AdminRoute exact path={Screens.ADMIN_STAFF} component={StaffListView} />
            <AdminRoute exact path={Screens.DETAIL_STAFF} component={DetailStaffView} />
            <AdminRoute exact path={Screens.CREATE_OR_UPDATE_STAFF} component={CreateOrUpdateStaffView} /> */}

        </Switch>
    );
}
