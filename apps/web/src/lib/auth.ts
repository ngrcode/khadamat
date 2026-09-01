import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenStorage = {
        getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY),

        setAccessToken: (token: string) => {
                Cookies.set(ACCESS_TOKEN_KEY, token, {
                        expires: 7,
                        secure: true,
                        sameSite: "strict",
                });
        },

        removeAccessToken: () => {
                Cookies.remove(ACCESS_TOKEN_KEY);
        },

        getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),

        setRefreshToken: (token: string) => {
                Cookies.set(REFRESH_TOKEN_KEY, token, {
                        expires: 30,
                        secure: true,
                        sameSite: "strict",
                });
        },

        clearTokens: () => {
                Cookies.remove(ACCESS_TOKEN_KEY);
                Cookies.remove(REFRESH_TOKEN_KEY);
        },
};