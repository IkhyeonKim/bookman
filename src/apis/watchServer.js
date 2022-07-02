export const api =
  ({ baseUrl, version }) =>
  async () => {
    let url = `${baseUrl}/${version}/sse`;
    const eventSource = new EventSource(url);

    console.log({ url, eventSource });

    eventSource.onopen = (event) => {
      console.log("server is opned", event);
    };

    eventSource.onmessage = (event) => {
      console.log("server sent a message", { event });
    };

    eventSource.onerror = (event) => {
      console.log("Server sent an error", { event });
    };

    return eventSource;
  };
