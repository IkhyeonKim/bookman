import { useEffect, useState } from "react";
import { watchServer } from "./apis";
import MainPage from "./components/pages/mainPage";
import "antd/dist/antd.css";

const useEventSource = (url) => {
  const [data, updateData] = useState(null);

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = function logEvents(event) {
      console.log(event);
      updateData(JSON.parse(event.data));
    };
  }, [url]);

  return data;
};

function App() {
  const DEPENDENCY = "something";
  const [message, setMessage] = useState("");
  // const data = useEventSource("https://bookman.brique.kr:8080/v1/sse");
  useEffect(() => {
    const eventSource = new EventSource("https://bookman.brique.kr:8080/v1/sse");

    eventSource.onopen = (event) => {
      console.log("server is opned", event);
    };

    eventSource.onmessage = (event) => {
      console.log("server sent a message", { event });
      setMessage(JSON.parse(event.data));
    };

    eventSource.onerror = (event) => {
      console.log("Server sent an error", { event });
    };

    eventSource.addEventListener("START_RENTAL", (e) => {
      console.log("START_RENTAL", { e });
      const data = JSON.parse(e.data);
      setMessage(data.status);
    });

    eventSource.addEventListener("END_RENTAL", (e) => {
      console.log("END_RENTAL", { e });
      const data = JSON.parse(e.data);
      setMessage(data.status);
    });

    return () => eventSource.close();
  }, [DEPENDENCY]);
  return (
    <div>
      Hello World
      <MainPage />
      <div>{message}</div>
    </div>
  );
}

export default App;
