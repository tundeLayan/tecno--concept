const dev = {
  feUrl: "http://localhost:3000",
  baseUrl: "https://api.phantommagazines.com/api",
};

const staging = {
  feUrl: "https://tecno-concept.vercel.app",
  baseUrl: "https://api.phantommagazines.com/api",
};

const queryArgs = {
  searchParams: "",
  pageNumber: 1,
  pageSize: 100,
};

export default {
  tokenKey: "tecno-concept-token-key",
  ...dev,
  ...staging,
  queryArgs,
};
