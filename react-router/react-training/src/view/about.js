import React from "react";

function About(props) {
  const { history } = props;
  const { go, goBack, goForward, push, length } = history;
  return (
    <div>
      {length}
      <button
        onClick={() => {
          goBack();
        }}
      >
        点击返回一步
      </button>
      <button
        onClick={() => {
          goForward();
        }}
      >
        点击前进一步
      </button>
      <button
        onClick={() => {
          go(3);
        }}
      >
        点击前进3步
      </button>
      <input
        type="text"
        onBlur={({ target }) => {
          // console.log(target.value);
          go(target.value);
        }}
      />
      <button onClick={()=>{
        push("/");
      }}>点击在不刷新的情况下跳转至index</button>
    </div>
  );
}

export default About;
