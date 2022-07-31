import MainPage from "./components/pages/mainPage";
import "antd/dist/antd.css";
import { useEventSource } from "./hooks/useEventSource";
import { createGlobalStyle } from "styled-components";
import { useWebSocket } from "./hooks/useWebSocket";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-boder-color: #dcdcdc;
  }
`;

const SSE_URL = "https://bookman.brique.kr:8080/v1/sse";
const WEB_SOCKET_URL = "wss://bookman.brique.kr:8080/v2/event";

function App() {
  const data = useEventSource(SSE_URL);
  const socket = useWebSocket(WEB_SOCKET_URL);

  return (
    <div>
      <GlobalStyle />
      <MainPage serverEvent={data} socket={socket} />
    </div>
  );
}

export default App;
