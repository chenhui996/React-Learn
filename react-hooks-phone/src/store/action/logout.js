// 异步的action: login
import HTTP from "./http";
function loginOut(){
    return function(dispatch){
        return HTTP.post("/user/logout").then(res => {
            // console.log(res.data.code);
            if(res.data.code === 0){
                dispatch({
                    type: "LOGOUT"
                });
            }
        });
    }
}

export default loginOut;