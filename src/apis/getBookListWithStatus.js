import axios from "axios";
import { getBookStatus } from ".";

export const api =
  ({ baseUrl, version }) =>
  async ({ offset = 0, limit = 20 }) => {
    let _offset = offset;
    let _limit = limit;

    let url = `${baseUrl}/${version}/books?offset=${_offset}&limit=${_limit}`;
    try {
      const response = await axios.get(url);
      console.log({ response });
      let bookList = [];
      if (response.data) {
        bookList = response.data.data;
      }
      const requestArr = response.data.data.map(async (book) => {
        const res = await getBookStatus({ bookId: book.id });
        return res;
      });

      console.log({ requestArr });
      return Promise.all(requestArr).then((values) => {
        console.log({ values });
        return values.map((value, index) => {
          return { ...value, ...bookList[index] };
        });
      });
      // console.log({ bookStatusArr });
      // return bookStatusArr;
    } catch (error) {
      console.log(error);
    }
  };
