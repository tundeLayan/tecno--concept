import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { routes } from '../routes';
import config from "../config";
import { getLocalStorage, saveLocalStorage, clearLocalStorage } from "./helper";

const baseURL = config.baseUrl;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// const refreshToken = async (originalRequest: AxiosRequestConfig) => {
//   try {
//     const token = getLocalStorage(config.tokenKey);
//     const url = `${baseURL}/Account/refresh-token?token=${token?.refreshToken}`;

//     const { data, ...response } = await axios.post(url);

//     if (data.status === 200) {
//       // old request and save new token
//       saveLocalStorage(data.data, config.tokenKey);

//       if (originalRequest && originalRequest.headers) {
//         originalRequest.headers.Authorization = `Bearer ${data.data?.jwToken}`;
//       }

//       // console.log('testtt', axios(originalRequest));
//       axios(originalRequest);

//       return { data, ...response };
//     }

//     // window.location.href = `${routes.auth.logout.path}?next=${window.location.pathname}`;
//     return Promise.reject(response);
//   } catch (error) {
//     // TODO: Logout user
//     // delete
//     clearLocalStorage(config.tokenKey);
//     setTimeout(() => {
//       window.location.href = `${routes.auth.login.path}?next=${window.location.pathname}`;
//     }, 1000);
//     return Promise.reject(error);
//   }
// };

const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getLocalStorage(config.tokenKey);
  if (!request.headers) return request;

  request.headers!.Authorization = `Bearer ${token?.token || ""}`;

  return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest: any = error.config;
  const statusCode = error.response!.status;

  if (statusCode === 401) {
    clearLocalStorage(config.tokenKey);
    // const response = await refreshToken(originalRequest);
    return Promise.reject("Expired token");
  }

  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
