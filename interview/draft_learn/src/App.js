import Child from "./Child";
import Ref from "./Ref";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState(
    "这是 '父' 组件初识值，等待子组件信息传来"
  );
  let AchieveChildTitle = (text) => {
    setTitle(text);
  };

  return (
    <div>
      <Child AchieveChildTitle={AchieveChildTitle} />
      <h2>{title}</h2>
      <Ref />
    </div>
  );
}

export default App;
