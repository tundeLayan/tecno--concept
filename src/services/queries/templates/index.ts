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
    onSuccess: (data: any) => {
      // if (data.nextPage) {
      //   const nextHash = [...hash];
      //   nextHash[1] = Number(nextHash[1]) + 1;
      //   const nextQuery: any = { ...query, pageNumber: nextHash[1] };
      //   queryClient.prefetchQuery(nextHash, () => readFn(nextQuery));
      // }
    },
    onError: () => {},
  });

  const data = (response.data ? response.data : {}) as any;

  return { ...response, data };
};
const queries = { read };

export default queries;
