import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
export default function Todo(props) {
  let { id, done, title } = props.data;
  let dispatch = useDispatch();
  let [edit, setEdit] = useState(false);
  let editText = useRef();
  const [editVal, setEditVal] = useState(title);
  useEffect(() => {
    if (edit) {
      editText.current.focus();
    }
  }, [edit]);
  return (
    <li className={edit ? "editing" : ""}>
      <div className="todo">
        <div className="display">
          <input
            className="check"
            type="checkbox"
            checked={done}
            onChange={({ target }) => {
              dispatch({
                type: "DONE",
                id,
                done: target.checked,
              });
            }}
          />
          <div
            className="todo-content"
            onDoubleClick={() => {
              setEdit(true);
            }}
          >
            {title}
          </div>
          <span
            className="todo-destroy"
            onClick={() => {
              dispatch({
                type: "DELETE",
                id,
              });
            }}
          ></span>
        </div>
        <div className="edit">
          <input
            className="todo-input"
            type="text"
            ref={editText}
            onBlur={() => {
              setEdit(false);
              if (editVal) {
                dispatch({
                  type: "EDIT",
                  id,
                  title: editVal,
                });
              } else {
                setEditVal(title);
              }
            }}
            value={editVal}
            onChange={({ target }) => {
              setEditVal(target.value);
            }}
          />
        </div>
      </div>
    </li>
  );
}
