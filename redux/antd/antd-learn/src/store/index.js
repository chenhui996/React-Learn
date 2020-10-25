import { combineReducers, createStore } from "redux";
import topics from "./reducer/topics.js";

const store = createStore(combineReducers(topics));

export default store;
