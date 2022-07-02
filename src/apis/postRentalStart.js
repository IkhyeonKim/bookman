export const api =
  ({ baseUrl, version }) =>
  async ({ bookId, userId = 2 }) => {
    let url = `${baseUrl}/${version}/books/${bookId}/rent?status=start`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ userId }),
    });
    console.log(response);
    return response.json();
  };
