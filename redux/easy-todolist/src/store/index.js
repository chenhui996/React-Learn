import { createStore } from "redux";

function reducer(
  state = {
    data: [
      {
        id: 0,
        title: "cain",
        message: "yepyepyepyepyepyepyepyepyepyepyep",
        done: false,
      },
      {
        id: 1,
        title: "snake",
        message: "yepyepyepyepyepyepyepyepyepyepyep",
        done: true,
      },
      {
        id: 2,
        title: "333",
        message: "yepyepyepyepyepyepyepyepyepyepyep",
        done: false,
      },
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
            message: action.message,
            done: false,
          },
        ],
      };
    case "DONE":
      // let nowData = [...state.data];
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
    case "ALL_DONE":
      nowData = [...state.data];
      nowData.forEach((item, index) => {
        nowData[index] = {
          ...item,
          done: action.done,
        };
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
              message: action.message,
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
