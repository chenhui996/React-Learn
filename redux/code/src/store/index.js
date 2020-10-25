import { createStore } from "redux";

function reducer(
  state = {
    data: [
      { id: 0, title: "cain", done: false },
      { id: 1, title: "snake", done: true },
      { id: 2, title: "333", done: false },
    ],
  },
  action
) {
  let nowData;
  switch (action.type) {
    case "ADD":
      return {
        data: [
          ...state.data,
          {
            id: Date.now(),
            title: action.title,
            done: false,
          },
        ],
      };
    case "DONE":
      nowData = [...state.data];
      nowData.forEach((item, index) => {
        if (item.id === action.id) {
          nowData[index] = {
            ...item,
            done: action.done,
          };
        }
      });
      return {
        data: nowData,
      };
    case "DELETE":
      nowData = [...state.data];
      return {
        data: nowData.filter((item) => item.id !== action.id),
      };
    case "SELECT_DELETE":
      nowData = [...state.data];
      return {
        data: nowData.filter((item) => item.done !== true),
      };
    case "EDIT":
      nowData = [...state.data];
      nowData.forEach((item, index) => {
        if (item.id === action.id) {
          nowData[index] = {
            ...item,
            title: action.title,
          };
        }
      });
      return {
        data: nowData,
      };
    default:
      break;
  }
  return state;
}

const store = createStore(reducer);

export { store };
