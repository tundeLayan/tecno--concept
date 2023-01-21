import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
  useParams,
} from "react-router-dom";

import config from "../../../config";
// import routes from '../../../routes';
import api from "../../api";
import {
  errorToast,
  handleErrors,
  saveLocalStorage,
  successToast,
} from "../../helper";
import templates from "./keys";

const BASE_URL = "/medias";

// fetch all templates
const readFn = async (query: any) => {
  let url = `${BASE_URL}?per_page=${query.pageSize}&page=${query.pageNumber}`;

  const res = await api.get({ url });
  return res;
};

const read = (options = { query: config.queryArgs }) => {
  // const queryClient = useQueryClient();
  const query = { ...config.queryArgs, ...options.query };
  const { pageNumber, pageSize } = query;

  const hash = [templates.read, Number(pageNumber), pageSize];

  const response = useQuery(hash, () => readFn(query), {
    ...options,
    keepPreviousData: true,
    onSuccess: (data: any) => {},
    onError: () => {},
  });

  const data = (response.data ? response.data : {}) as any;

  return { ...response, data };
};

// fetch one template
const readOne = (id: string = "", options = {}) => {
  const { isLoading, data, isSuccess, ...rest } = useQuery(
    [templates.readOne, id],
    () => api.get({ url: `${BASE_URL}/${id}` }),
    {
      ...options,
      onSuccess: () => {},
      onError: () => {},
      enabled: !!id,
    }
  );

  return { isLoading, data, isSuccess, ...rest };
};

// create template
const create = (
  successCallback = (path: string, name: string) => {},
  options = {}
) => {
  const { mutate, isLoading, data, isSuccess } = useMutation(api.post, {
    mutationKey: [templates.create],
    ...options,
    onSuccess: (res) => {
      // console.log("res is", res);
      successCallback(`${res.data.id}`, `${res.data.title}`);
    },
    onError: (err) => {},
  });
  return {
    mutate: (body: any) => mutate({ url: `${BASE_URL}`, body }),
    isLoading,
    data,
    isSuccess,
  };
};

// update template
const update = (options = {}) => {
  const { mutate, isLoading, data, isSuccess } = useMutation(api.put, {
    mutationKey: [templates.create],
    ...options,
    onSuccess: (res) => {
      // console.log("res is", res);
    },
    onError: (err) => {},
  });
  return {
    mutate: (body: any, id: string) =>
      mutate({ url: `${BASE_URL}/${id}`, body }),
    isLoading,
    data,
    isSuccess,
  };
};

const queries = { read, readOne, create, update };

export default queries;
