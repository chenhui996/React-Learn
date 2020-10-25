import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// <li className="editing">
export default function Todo(props) {
  let { id, done, title, message } = props.data;
  let dispatch = useDispatch();
  let [edit, setEdit] = useState(false);
  let editText = useRef();
  const [editVal, setEditVal] = useState(message);
  useEffect(() => {
    if (edit) {
      editText.current.focus();
    }
  }, [edit]);
  return (
    <li className={edit ? "editing" : ""}>
      <h3>{title}</h3>
      <input
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
      <p
        onDoubleClick={() => {
          setEdit(true);
        }}
      >
        {message}
      </p>
      <textarea
        ref={editText}
        onBlur={() => {
          setEdit(false);
          if (editVal) {
            dispatch({
              type: "EDIT",
              id,
              message: editVal,
            });
          }
          else{
            setEditVal(message);
          }
        }}
        value={editVal}
        onChange={({ target }) => {
            setEditVal(target.value);
        }}
      ></textarea>
      <a
        onClick={() => {
          dispatch({
            type: "DELETE",
            id,
          });
        }}
      >
        删除
      </a>
    </li>
  );
}
