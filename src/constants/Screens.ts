const Screens = {
    // =========================================================================
    // Auth
    // =========================================================================
    LOGIN_REDIRECT: "/auth/callback",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGIN_2FA: "/auth/login2FA",
    VALIDATE_TWO_FACTOR_PIN: "/auth/validateTwoFactorPin",
    SIGN_UP: "/auth/sign-up",
    RETAIL_LOGIN: "/retail/auth/login",
    RETAIL_SIGNUP: "/retail/auth/sign-up",

    // =========================================================================
    // Main
    // =========================================================================
    /** / */
    HOME: "/",
    ADMIN_USER: "/admin/user/list",
    PROFILE: "/profile",

    //Notification
    ADMIN_NOTIFICATION: "/admin/notification/list",

    //category
    ADMIN_CATEGORY: "/admin/category/list",
    CREATE_UPDATE_CATEGORY: "/admin/category/edit",

    //realEstate
    ADMIN_REAL_ESTATE: "/admin/realEstate/list",
   CREATE_UPDATE_REAL_ESTATE: "/admin/realEstate/edit",

    //news
    ADMIN_NEWS: "/admin/news/list",
    CREATE_UPDATE_NEWS: "/admin/news/edit",

};

export default Screens;
