import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="addMessage">
      <input
        type="text"
        placeholder="请输入昵称"
        value={title}
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      />
      <textarea
        placeholder="请输入留言"
        value={message}
        onChange={({ target }) => {
          setMessage(target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          if (title !== "") {
            dispatch({
              type: "ADD",
              title,
              message
            });
            setTitle("");
            setMessage("");
          }
        }}
      >
        提交留言
      </button>
    </div>
  );
}
