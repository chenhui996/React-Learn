import { createStore } from "redux";

function reducer(state = { count: 1 }, action) {
  console.log(action);
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
store.dispatch({
  type: "ADD", // 行规，最好大写
});
console.log("这是执行了ADD之后的count", store.getState());

store.dispatch({
  type: "MINUS", // 行规，最好大写
});

console.log("这是执行了MINUS之后的count", store.getState());

console.log(store);
