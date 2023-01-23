import { useMutation, useQuery } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";

import { useNavigate, NavigateFunction } from "react-router-dom";

import config from "../../../config";
// import routes from '../../../routes';
import api from "../../api";
import {
  errorToast,
  handleErrors,
  saveLocalStorage,
  successToast,
} from "../../helper";
import queryKey from "./keys";

const BASE_URL = "/auth/google/authorize";

// login
const read = (url = BASE_URL, options = {}) => {
  const router: NavigateFunction = useNavigate();

  const { mutate, isLoading, data, isSuccess } = useMutation(api.post, {
    mutationKey: [queryKey.read],
    ...options,
    onSuccess: (response) => {
      if (response.status === 200) {
        let userData = jwt_decode(response.data) as any;
        userData.token = response.data;

        saveLocalStorage(userData, config.tokenKey);
        successToast("Sign in successful");
        // const route = router.query?.next && router.query.next !== '/' ? String(router.query.next) : routes[role].path;
        setTimeout(() => router("/templates"), 300);
      }
    },
    onError: (err: any) => {
      console.log(err);
      // errorToast(handleErrors(err));
    },
  });
  return {
    mutate: (body: string) => {
      return mutate({
        url: `${url}?access_token=${body}`,
        body: "",
        auth: false,
      });
    },
    isLoading,
    data,
    isSuccess,
  };
};

const del = (options = {}) => {
  const response = useQuery(
    [queryKey.read],
    () => api.get({ url: `${BASE_URL}/` }),
    {
      ...options,
      onSuccess: () => {},
      onError: () => {},
    }
  );

  return response;
};

// const queries = { create, read, delete: del };
const queries = { read, delete: del };

export default queries;
