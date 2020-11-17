import React from "react";
import { BrowserRouter } from "react-router-dom";
import IndexRouter from "./router/index";
import Frame from "./common/component/frame";
function App(props) {
  return (
    <BrowserRouter>
      <Frame>
        <IndexRouter />
      </Frame>
    </BrowserRouter>
  );
}

export default App;
