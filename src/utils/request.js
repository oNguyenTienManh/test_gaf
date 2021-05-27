import axios from 'axios';
import _get from 'lodash/get';
import getConfig from 'next/config';
import { cookiesToObjects } from 'utils/helpers';
import cookieStorage, { ACCESS_TOKEN } from './cookieStorage';

const { publicRuntimeConfig } = getConfig();

const basicAuth = publicRuntimeConfig.BASIC_AUTH;

const request = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  withCredentials: false,
  ...(basicAuth && { auth: basicAuth }),
  headers: { Pragma: 'no-cache' },
});

// request for login/forget password, no need pass token
const requestPublic = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  withCredentials: false,
  ...(basicAuth && { auth: basicAuth }),
  headers: { Pragma: 'no-cache' },
});

const requestServerInstance = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  withCredentials: false,
  ...(basicAuth && { auth: basicAuth }),
  headers: { Pragma: 'no-cache' },
});

function handleErrorResponse({ error, ctx }) {
  const status = _get(error, 'response.status', 0);
  if (status === 403 && ctx) {
    // forbidden
    ctx.res.redirect('/403');
  }
  if (status === 404 && ctx) {
    // not found
    ctx.res.redirect('/404');
  }
}

function getRequestToken({ ctx }) {
  let lang;
  let token;
  if (process.browser) {
    lang = cookiesToObjects(document.cookie || '')['next-i18next'] || '';
    token = cookieStorage.getAuthToken();
  } else {
    const cookie = cookiesToObjects(ctx.req.headers.cookie);
    token = cookie[ACCESS_TOKEN];
    lang = cookie['next-i18next'] || '';
  }
  return { token, lang };
}

request.interceptors.request.use((config) => {
  const { lang, token } = getRequestToken(config);
  return {
    ...config,
    headers: {
      ...config.headers,
      'Accept-Language': lang,
      // Authorization: `Bearer ${token}`,

      'Auth-Token': `Bearer ${token}`,
    },
  };
});

requestPublic.interceptors.request.use((config) => {
  const { lang } = getRequestToken(config);
  return {
    ...config,
    headers: {
      ...config.headers,
      'Accept-Language': lang,
    },
  };
});

requestPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    handleErrorResponse({ error });
    return Promise.reject(error.response);
  },
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    handleErrorResponse({ error });
    return Promise.reject(error.response);
  },
);

function requestServer({ ctx, ...options }) {
  const { token, lang } = getRequestToken({ ctx });
  return new Promise((resolve, reject) => {
    requestServerInstance
      .request({
        ...options,
        headers: {
          'Accept-Language': lang || '',
          ...(token && { 'Auth-Token': `Bearer ${token}` }),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        handleErrorResponse({ error, ctx });
        reject(error);
      });
  });
}

export { request, requestPublic, requestServer };
