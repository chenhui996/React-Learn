import React, { useState, useEffect } from "react";

export default function CustomChild(props) {
  const [titleChild, setTitleChild] = useState("这是 '子' 组件，初始值");
  let { AchieveChildTitle } = props;
  useEffect(() => {
    // useEffect是渲染完成后执行
    AchieveChildTitle(titleChild);
  }, [titleChild]);

  return (
    <div>
      <h1>{titleChild}</h1>
      <input
        type="text"
        placeholder="请输入昵称"
        value={titleChild}
        onChange={({ target }) => {
          setTitleChild(target.value); // 异步，最后处理
          // AchieveChildTitle(titleChild); // 同步，会慢一步,所以，要用到useEffect，因为，useEffect是渲染完成后执行
        }}
      />
    </div>
  );
}
