import { IKPI } from './../commons/utils/Interface';
import { types, onSnapshot } from "mobx-state-tree";
// import { userInfo } from "os";
import { Constants } from "../constants";

const Model = types
    .model("model", {
        model: types.frozen()
    })
    .actions((self) => ({
        setModel(model: any) {
            self.model = model;
        }
    }));

const Global = types
    .model("session", {
        isAuthenticated: false,
        isRetailAuthenticated: false,
        isShowLoading: false,
        isShowPageLoading: false,
        user: types.frozen(),
        userInfo: types.frozen(),
        resources: types.frozen(),
        roleLevel: types.frozen(),
        roleCode: types.frozen(),
        targetScreen: types.frozen(),
        breadcrumbs: types.frozen(),
        drawerIndex: 0,
        openDrawer: false,
        receiptList: types.array(types.frozen()),
        listLanguage: types.frozen(),
        messagePayload: types.frozen(),
        request2FA: types.frozen(),
        queryString: types.frozen(),
        totalCount: types.frozen(),
        cityList: types.frozen(),
        regionByAccountLogin: types.frozen(),
        currentToken: types.frozen(),
        firebaseToken: types.frozen(),
        loginId: types.frozen(),
        loginHistoryId: types.frozen(),
        kpi: types.frozen(),
        kpiType: types.frozen(),
        isUpdateKPI: types.frozen(),
    })
    .actions((self) => ({
        setAuthenticateStatus(isAuthenticated: boolean) {
            self.isAuthenticated = isAuthenticated;
        },
        setRetailAuthenticatedStatus(isRetailAuthenticated: boolean) {
            self.isRetailAuthenticated = isRetailAuthenticated;
        },
        showLoading() {
            self.isShowLoading = true;
        },
        hideLoading() {
            self.isShowLoading = false;
        },
        showPageLoading() {
            self.isShowPageLoading = true;
        },
        hidePageLoading() {
            self.isShowPageLoading = false;
        },
        setUser(user: any) {
            self.user = user;
        },
        setUserInfo(userInfo: any) {
            self.userInfo = userInfo;
        },
        setResources(resources: any) {
            self.resources = resources;
        },
        setRoleLevel(roleLevel: any) {
            self.roleLevel = roleLevel;
        },
        setRoleCode(roleCode: any) {
            self.roleCode = roleCode;
        },
        setTargetScreen(targetScreen: any) {
            self.targetScreen = targetScreen;
        },
        setBreadcrumbs(breadcrumbs: any) {
            self.breadcrumbs = breadcrumbs;
        },
        setDrawerIndex(index: number) {
            self.drawerIndex = index;
        },
        setOpenDrawer(value: boolean) {
            self.openDrawer = value;
        },
        setReceipt(receiptList: any) {
            self.receiptList = receiptList;
        },
        setListLanguage(language?: any) {
            self.listLanguage = language
        },
        setMessagePayload(_messagePayload: any) {
            self.messagePayload = _messagePayload;
        },
        setRequest2FA(data: any) {
            self.request2FA = data;
        },
        setQueryString(queryString: string) {
            self.queryString = queryString;
        },
        setTotalCount(totalCount: any) {
            self.totalCount = totalCount;
        },
        setCityList(cityList: any) {
            self.cityList = cityList;
        },
        setRegionByAccountLogin(regions: any) {
            self.regionByAccountLogin = regions;
        },
        setCurrentToken(currentToken : any) {
            self.currentToken = currentToken;
        },
        setFirebaseToken(firebaseToken : any) {
            self.firebaseToken = firebaseToken;
        },
        setLoginId(loginId : any) {
            self.loginId = loginId;
        },
        setLoginHistoryId(loginHistoryId : any) {
            self.loginHistoryId = loginHistoryId;
        },
        setKpi(kpi : IKPI) {
            self.kpi = kpi;
        },
        setKpiType(kpiType: number) {
            self.kpiType = kpiType;
        },
        setIsUpdateKPI(isUpdateKPI : boolean) {
            self.isUpdateKPI = isUpdateKPI;
        }
    }));

const sessionStorageState = localStorage.getItem(Constants.StorageKeys.GLOBAL_STATE);
// sessionStorage.getItem(Constants.StorageKeys.GLOBAL_STATE);
const initialState = sessionStorageState !== null ? JSON.parse(sessionStorageState) : {};

function createGlobalState(snapshot: any) {
    var store;
    let snapshotListenerDestroyer: any = undefined;
    // clean up snapshot listener
    if (snapshotListenerDestroyer) snapshotListenerDestroyer()

    // create new one
    store = Global.create(snapshot);
    // connect local storage
    snapshotListenerDestroyer = onSnapshot(store, (snapshot) =>
        localStorage.setItem(Constants.StorageKeys.GLOBAL_STATE, JSON.stringify(snapshot))
        // sessionStorage.setItem(Constants.StorageKeys.GLOBAL_STATE, JSON.stringify(snapshot))
    )
    return store;
}


const ModelStorage = Model.create();
let GlobalState = createGlobalState(initialState);

export function clearGlobalState() {
    GlobalState = createGlobalState({});
    localStorage.clear();
    // sessionStorage.clear();

}

export {
    ModelStorage,
    GlobalState,
};
