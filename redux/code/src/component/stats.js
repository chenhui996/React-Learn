import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Stats() {
  const data = useSelector((state) => state.data);
  let doneDataLen = data.filter((dataItem) => dataItem.done);
  const dispatch = useDispatch();
  return (
      <div id="todo-stats">
        <span className="todo-count">
          <span className="number">{data.length - doneDataLen.length}</span>
          <span className="word">项待完成</span>
        </span>
        <span className="todo-clear">
          <a 
            onClick={() => {
              dispatch({
                type: "SELECT_DELETE",
              });
            }}
          >
            Clear <span>{doneDataLen.length}</span> 已完成事项
          </a>
        </span>
      </div>
  );
}
