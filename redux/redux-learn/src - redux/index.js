import React from "react";
import ReactDom from "react-dom";

import { createStore } from "redux";

function reducer(state = { count: 1 }, action) {
  console.log("Cain: 这是在reducer里面'打印'分发过来的action", action);
  switch (action.type) {
    case "ADD":
      return {
        count: state.count + 1,
      };
    case "MINUS":
      return {
        count: state.count - 1,
      };
    default:
      break;
  }
  return state;
}

const store = createStore(reducer);

// dispatch
// store.dispatch({
//   type: "ADD", // 行规, 最好大写
// });
// console.log("这是执行了ADD之后的count", store.getState());

// store.dispatch({
//   type: "MINUS", // 行规, 最好大写
// });
// console.log("这是执行了MINUS之后的count", store.getState());

// 核心方法, 监听数据, 并且调用渲染函数, 渲染新视图
const useSubscribe =  store.subscribe(() => {
  // 拿到更新后的数据, 再次调用render渲染视图
  render();
});

// 在react视图中拿之前处理过的count
function render() {
  ReactDom.render(
    <div>
      <p>{store.getState().count}</p>
      <button
        onClick={() => {
          // 设递增
          store.dispatch({
            type: "ADD",
          });
        }}
      >
        Add
      </button>
      {/* --------------------------------------------------- */}
      <button
        onClick={() => {
          // 设递减
          store.dispatch({
            type: "MINUS",
          });
        }}
      >
        Minus
      </button>
      {/* --------------------------------------------------- */}
      <button
        onClick={() => {
          // 取消监听
          useSubscribe()
        }}
      >
        Cancel to Monitor
      </button>
    </div>,
    document.querySelector("#root")
  );
}
render();
