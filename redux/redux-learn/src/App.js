import React from "react";
import {  useDispatch, useSelector } from "react-redux";

// function App(props) {
//     console.log(props);
//     let { count, dispatch } = props;
//   return <div>
//       <p>{count}</p>
//       <button onClick={() => {
//           dispatch({
//               type: "ADD"
//           });
//           }}>Add</button>
//   </div>;
// }

// let newApp = connect((state) => {
// //   console.log(state);
//   return {
//       count: state.count
//   };
// })(App);

// export default newApp;

function App() {
//   console.log(props);
//   let { count, dispatch } = props;
const count = useSelector(state => state.count);
const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch({
            type: "ADD",
          });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
