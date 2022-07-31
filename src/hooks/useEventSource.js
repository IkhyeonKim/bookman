import { useEffect, useState } from "react";

export const useEventSource = (url) => {
  const [serverEvent, updateServerEvent] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = (event) => {
      console.log("server is opned", event);
    };

    eventSource.onmessage = (event) => {
      console.log("server sent a message", { event });
      updateServerEvent(JSON.parse(event.data));
    };

    eventSource.onerror = (event) => {
      console.log("Server sent an error", { event });
    };

    eventSource.addEventListener("START_RENTAL", (e) => {
      console.log("START_RENTAL", { e });
      const data = JSON.parse(e.data);
      updateServerEvent({ type: e.type, data });
    });

    eventSource.addEventListener("END_RENTAL", (e) => {
      console.log("END_RENTAL", { e });
      const data = JSON.parse(e.data);
      updateServerEvent({ type: e.type, data });
    });

    eventSource.addEventListener("ADDED_BOOK", (e) => {
      console.log("ADDED_BOOK", { e });
      const data = JSON.parse(e.data);
      updateServerEvent({ type: e.type, data });
    });

    eventSource.addEventListener("UPDATED_BOOK", (e) => {
      console.log("UPDATED_BOOK", { e });
      const data = JSON.parse(e.data);
      updateServerEvent({ type: e.type, data });
    });

    eventSource.addEventListener("DELETED_BOOK", (e) => {
      console.log("UPDATED_BOOK", { e });
      const data = JSON.parse(e.data);
      updateServerEvent({ type: e.type, data });
    });

    return () => eventSource.close();
  }, [url]);

  return serverEvent;
};
