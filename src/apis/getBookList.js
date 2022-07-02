export const api =
  ({ baseUrl, version }) =>
  async ({ offset = 0, limit = 20 }) => {
    let _offset = offset;
    let _limit = limit;

    let url = `${baseUrl}/${version}/books?offset=${_offset}&limit=${_limit}`;

    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json();
  };
