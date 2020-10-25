import { combineReducers, createStore } from "redux";
import topics from "./reducer/topics";

const store = createStore(combineReducers(topics));

export default store;
