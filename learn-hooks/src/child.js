import React, { useState } from "react";

function Child() {
  //   let [count, setCount] = useState(1);
  //   let [name, setName] = useState("cain");
  let [state, setState] = useState({
    name: "cain",
    count: 1,
  });
  let { name, count } = state;
  return (
    <div>
      <input
        type="test"
        value={name}
        onChange={({ target }) => {
          setState({
            ...state,
            name: target.value,
          });
        }}
      />
      <p>{name}</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setState({
            ...state,
            count: count + 1,
          });
        }}
      >
        add
      </button>
    </div>
  );
}

export default Child;
