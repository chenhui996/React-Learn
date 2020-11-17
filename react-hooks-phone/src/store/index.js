import { createStore, applyMiddleware, combineReducers } from "redux";
import Thunk from "redux-thunk";
import reducers from "./reducers/index";

// createStore : 创建仓库
// applyMiddleware : 引入异步中间件
// combineReducers : 合并reducer

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(Thunk) // 疑问1: 中间件有什么用？
);


export default store;


// 这个文件其实不做任何事情:
// 只是把 redux 相关的东西 合并成 一个 store;
// 然后将 store 传递出去;