import Cookies from 'js-cookie';

export const ACCESS_TOKEN = 'access_token';
export const UNAUTHORIZED_PATH = 'unauthorized_path';
export const UNAUTHORIZED_CLIENT = 'unauthorized_client';

export default {
  setAuthToken(token) {
    Cookies.set(ACCESS_TOKEN, token, { expires: 7 });
  },
  getAuthToken() {
    return Cookies.get(ACCESS_TOKEN) || '';
  },
  getUnAuthorizedPath() {
    const unAuthorizedPath = Cookies.get(UNAUTHORIZED_PATH);
    const unAuthorizedClient = Cookies.get(UNAUTHORIZED_CLIENT);
    return { unAuthorizedPath, unAuthorizedClient };
  },
  clearUnAuthorizedPath() {
    Cookies.remove(UNAUTHORIZED_PATH);
    Cookies.remove(UNAUTHORIZED_CLIENT);
  },
  clearAuthToken() {
    Cookies.remove(ACCESS_TOKEN);
  },
};
