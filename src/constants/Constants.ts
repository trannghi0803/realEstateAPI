import { TEnvironment, TLanguage } from "../commons/utils";
// const DOMAIN = "https://spm-hv-api.inter-k.com"; // Server Test
const DOMAIN = "http://localhost:5000"; // Server Test
// const DOMAIN = "http://172.104.185.236:5021"; // Server Test
const Constants = {
    /**
     * Config for api.
     */
    Api: {
        /** Root URL of Api Server */
        BASE_URL: `${DOMAIN}/api`,
        MEDIA_URL: `${DOMAIN}`,
        IMAGE_URL: DOMAIN,
        CLIENT_CERT: null,
        CLIENT_ID: null,
        CLIENT_KEY: null,
        /** Timeout for each request: 25sec */
        TIMEOUT: 25 * 1000,
    },

    /**
     * Return code from Api
     */
    ApiCode: {
        // Code from server api
        SUCCESS: 200,
        VALIDATE: 400,
        AUTHENTIC_ERROR: 401,
        METHOD_ERROR: 403,
        // Code from local app
        CONNECTION_TIMEOUT: "CONNECTION_TIMEOUT",
        INTERNAL_SERVER: "INTERNAL_SERVER",
        UNKNOWN_NETWORK: "UNKNOWN_NETWORK",
    },

    /**
     * Setting path for Api
     */
    ApiPath: {
        Notification: {
            REGISTER: "Notification/Register",
            UN_REGISTER: "Notification/Unregister",
            GET_DETAIL: "/Notification/DetailMessage",
            GET_PAGED: "/Notification/GetPaged",
            READ_ALL: "/Notification/ReadAllMessage",
            READ: "/Notification/ReadMessage",
            DELETE_ALL: "/Notification/DeleteAllMesssge",
        },
        // auth
        LOGIN: "/Login",
        LOGOUT: "/Logout",
        REFRESH_TOKEN: "/RefreshToken",
        UPLOAD_FILE: "file/upload",
        GET_USER_INFO: "Account/GetUserInfo",
        CHECK_ACCOUNT: "/Account/CheckAccount",
        CHANGE_PASSWORD: "/Account/ChangePassword",

        Category: "/category",
        REAL_ESTATE: "/realEstate",
        NEWS: "/news",

        ADDRESS: {
            GET_PROVINCE: "/Address/getProvinces",
            GET_DISTRICT_BY_PROVINCE: "/Address/getDistrictsByProvinceCode/",
            GET_WARD_BY_DISTRICT: "/Address/getWardsByDistrictCode/",
        },
    },
    /**
     * Request methods
     */
    Methods: {
        DELETE: "DELETE",
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
    },

    /**
     * Styles for app.
     *
     * Color refer
     * @see https://www.rapidtables.com/web/color/index.html
     * @see https://www.w3schools.com/w3css/w3css_colors.asp
     */
    Styles: {
        // =====================================================================
        // Common color
        // =====================================================================
        BLACK_COLOR: "#000000",
        BLUE_COLOR: "#0000FF",
        GRAY_COLOR: "#808080",
        GREEN_COLOR: "#008000",
        LIGHTGRAY_COLOR: "#D3D3D3",
        RED_COLOR: "#FF0000",
        WHITE_COLOR: "#FFFFFF",
        BROWN_BLUE_COLOR: "#000080",

        // New - Analysis - Processing - Processed - Cancelled - Close
        STATUS_COLOR: ["#27AE60", "#FEC600", "#24EBC7", "#00AFF0", "#D3D3D3", "#CED4DA"],

        // =====================================================================
        // Console log style
        // Color refer at: https://www.w3schools.com/w3css/w3css_colors.asp
        // =====================================================================
        CONSOLE_LOG_DONE_ERROR: "border: 2px solid #F44336; color: #000000", // Red
        CONSOLE_LOG_DONE_SUCCESS: "border: 2px solid #4CAF50; color: #000000", // Green
        CONSOLE_LOG_ERROR: "background: #F44336; color: #FFFFFF", // Red
        CONSOLE_LOG_NOTICE: "background: #FF9800; color: #000000; font-size: x-large", // Orange
        CONSOLE_LOG_PREPARE: "border: 2px solid #2196F3; color: #000000", // Blue
        CONSOLE_LOG_START: "background: #2196F3; color: #FFFFFF", // Blue
        CONSOLE_LOG_SUCCESS: "background: #4CAF50; color: #FFFFFF", // Green

        // =====================================================================
        // Common size
        // =====================================================================
        AVATAR_SIZE: "80px",
        DEFAULT_FONTSIZE: "16px",
        DEFAULT_SPACING: "24px",
    },

    /**
     * Regex Expression
     */
    RegExp: {
        EMAIL_ADDRESS: "^(([^<>()\\[\\]\\\\.,;:\\s@`]+(\\.[^<>()\\[\\]\\\\.,;:\\s@`]+)*)|(`.+`))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
        ORGANIZATION_SHORTNAME: "^[A-Z0-9]{2,3}$",
        PASSWORD: "^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$",
        PHONE_NUMBER: "^\(?((0))\)?([1|3|5|7|8|9]{1})?([0-9]{8})$",
        USERNAME: "^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$",
        WEBSITE_URL: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
    },

    /**
     * Storage keys
     */
    StorageKeys: {
        GLOBAL_STATE: "GLOBAL_STATE",
        MENU_INDEX: "MENU_INDEX",
        FCM_TOKEN: "FCM_TOKEN",
        FIREBASE_TOKEN: "FIREBASE_TOKEN",
        TOKEN: "TOKEN",
        SESSION_ID: "SESSION_ID",

    },

    /**
     * Cookie keys
     */
    CookieNames: {
        LANGUAGE: "lang",
        SESSION_ID: "sessionId"
    },

    /**
     * Header name
     */
    HeaderNames: {
        DURATION: "X-Duration-Time"
    },

    /**
     * Event name using for DeviceEventEmitter
     */
    EventName: {
        SET_OPEN_DRAWER: "SET_OPEN_DRAWER",
        ON_LOGOUT: "ON_LOGOUT",
        TOKEN_EXPIRED: "TOKEN_EXPIRED"
    },

    /**
     * Environment
     */
    Environment: {
        DEV: "development" as TEnvironment,
        PRO: "production" as TEnvironment,
    },

    /**
     * Language
     */
    Language: {
        EN: "en" as TLanguage,
        VI: "vi" as TLanguage,
    },

    /**
     * Debounce time for action
     */
    DEBOUNCE_TIME: 400,
    MAX_AVATAR_FILE_SIZE: 5 * 1024 * 1024, // 5MB

    ROW_PER_PAGE: 10,
    ROW_PER_PAGE_25: 25,
    ROW_PER_PAGE_100: 100,
    ROW_PER_PAGE_OPTIONS: [25, 50, 100],

    DateFormat: {
        DDMM: "DD/MM",
        MMYYYY: "MM/YYYY",
        DDMMYYYY: "DD/MM/YYYY",
        DDMMYYYY_HHMM: "DD/MM/YYYY HH:mm",
        HHMM_DDMMYYYY: "HH:mm DD/MM/YYYY",
        HHMM: "HH:mm",
        YYYY: "YYYY",
        YYYYMM: "YYYY/MM",
        YYYYMMDD: "YYYY/MM/DD",
        DDDD: "dddd"
    },

    DRAWER_WIDTH: 240,
    
    PASSWORD_DEFAULT: "ABC@123"
};

export default Constants;