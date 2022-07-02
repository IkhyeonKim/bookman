import axios from "axios";

export const api =
  ({ baseUrl, version }) =>
  async ({ offset = 0, limit = 20 }) => {
    let _offset = offset;
    let _limit = limit;

    let url = `${baseUrl}/${version}/books?offset=${_offset}&limit=${_limit}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
