import { api as getBookListApi } from "./getBookList";
import { api as postRentalStartApi } from "./postRentalStart";
import { api as postRentalEndApi } from "./postRentalEnd";
import { api as watchServerApi } from "./watchServer";

const baseConfig = {
  baseUrl: "https://bookman.brique.kr:8080",
  version: "v1",
};

const getBookList = getBookListApi(baseConfig);
const postRentalStart = postRentalStartApi(baseConfig);
const postRentalEnd = postRentalEndApi(baseConfig);
const watchServer = watchServerApi(baseConfig);

export { getBookList, postRentalStart, postRentalEnd, watchServer };
