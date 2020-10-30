import { useEffect, useRef } from "react";

function Hello() {
    const customRef = useRef(null);
    const onButtonClick = () => {
      // 注意：通过 "current" 取得 DOM节点
      customRef.current.focus();
    };
    // 自动获取焦点
    useEffect(()=>{
        customRef.current.focus();
    });
    return (
      <>
        <input ref={customRef} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }

  export default Hello;