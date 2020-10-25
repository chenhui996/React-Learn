import { createStore } from "redux";

function reducer(state = {
  count: 1,
  name: "cain"
}, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1
      }
  
    default:
      break;
  }
  return state;
}

const store = createStore(reducer);


export {store};
