import axios from "axios";

export const api =
  ({ baseUrl, version }) =>
  async ({ bookId }) => {
    let url = `${baseUrl}/${version}/books/${bookId}/status`;
    try {
      const response = await axios.get(url);
      if (response.data) {
        return { ...response.data.data };
      } else {
        return { bookId };
      }
    } catch (error) {
      console.log(error);
    }
  };
