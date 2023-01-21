// import { Id, toast } from "react-toastify";
import config from "../config";

export const errorToast = (message = "Something went wrong", toastId?: any) => {
  // toast.error(message, {
  //   toastId,
  // });
  console.log("error", message);
};

export const successToast = (message = "Successful", toastId?: any) => {
  // toast.success(message, { toastId });
  console.log("success", message);
};

export const saveLocalStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
};
export const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
  return null;
};

export const checkToken = () => {
  const token = getLocalStorage(config.tokenKey);

  return !!token;
};

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

export function handleErrors(err: any) {
  const { response, message } = err;
  const { data } = response;

  if (!data) return message;

  const errorMessage: string = data?.message || "Something went wrong";

  return errorMessage;
}
