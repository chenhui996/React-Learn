import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="content">
      <div id="create-todo">
        <input
          id="new-todo"
          placeholder="What needs to be done?"
          autoComplete="off"
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          onKeyDown={({ key }) => {
            if (key == "Enter" && title !== "") {
              dispatch({
                type: "ADD",
                title,
              });
              setTitle("");
            }
          }}
        />
      </div>
    </div>
  );
}
