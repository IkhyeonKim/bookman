import MainPage from "./components/pages/mainPage";
import "antd/dist/antd.css";
import { useEventSource } from "./hooks/useEventSource";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-boder-color: #dcdcdc;
  }
`;

const SSE_URL = "https://bookman.brique.kr:8080/v1/sse";

function App() {
  const data = useEventSource(SSE_URL);
  return (
    <div>
      <GlobalStyle />
      <MainPage serverEvent={data} />
    </div>
  );
}

export default App;
