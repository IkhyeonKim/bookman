export const api =
  ({ baseUrl, version }) =>
  async ({ bookId, userId = 2 }) => {
    let url = `${baseUrl}/${version}/books/${bookId}/rent?status=end`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ userId }),
    });
    return response;
  };
