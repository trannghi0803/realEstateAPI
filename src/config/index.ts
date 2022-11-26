import { UserManager } from "oidc-client";
import { GlobalState } from "../stores/GlobalState";
const config_dev = {
    authority: "https://localhost:5000/",
    client_id: "heineken-spms-admin",
    client_secret: "secret",
    // redirect_uri: "https://staging.ihk.com.vn/auth/callback",
    response_type: "code",
    scope: "openid profile",
    loadUserInfo: true,
    prompt: "login"
};

// for deploy
// const config_dev = {
//     authority: "https://id.maysoft.io/",
//     client_id: "ipay-book-web-dev",
//     client_secret: "secret",
//     redirect_uri: "http://172.105.125.165:3036/auth/callback",
//     response_type: "code",
//     scope: "openid profile",
//     loadUserInfo: true,
//     prompt: "login"
// };

const config_prod = {
    authority: "https://id.maysoft.io/",
    client_id: "ipay-book-web",
    client_secret: "secret",
    redirect_uri: "http://localhost:3000/auth/callback",
    response_type: "code",
    scope: "openid profile",
    loadUserInfo: true,
    prompt: "login"
};

const userManager = new UserManager(config_dev);

export async function loadUserFromStorage() {
    try {
        let user = await userManager.getUser()
        if (user) {
            GlobalState.setUser(user);
        }
    } catch (e) {
        console.error(`User not found: ${e}`)
    }
}

export function signinRedirect() {
    return userManager.signinRedirect();
}

export function signinRedirectCallback() {
    return userManager.signinRedirectCallback();
}

export async function signoutRedirect() {
    await userManager.clearStaleState();
    await userManager.removeUser();
    return userManager.signoutRedirect();
}

export async function signoutRedirectCallback() {
    await userManager.clearStaleState();
    await userManager.removeUser();
    return userManager.signoutRedirectCallback();
}

export default userManager;