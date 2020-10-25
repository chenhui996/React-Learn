import React from "react";
import { useSelector } from "react-redux";
import Todo from "./todo";

export default function List() {
  const data = useSelector((state) => state.data);
  return (
    <ul id="todo-list">
      {data.map((item) => {
        return <Todo data={item} key={item.id} />;
      })}
    </ul>
  );
}
