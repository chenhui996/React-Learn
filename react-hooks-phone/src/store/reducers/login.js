export default function getUser(state="",action){
  switch(action.type){
      case "LOGIN":
          return action.user;
      case "LOGOUT":
          return "";
      default:
          break;    
  };
  return state
}

