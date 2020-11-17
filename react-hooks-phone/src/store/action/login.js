// 异步的action: login
import HTTP from "./http";
function login(data){
    return function(dispatch){
        return HTTP.post("/user/login", data).then(res => {
            // console.log(res);
            if(res.data.code === 0){
                dispatch({
                    type: "LOGIN",
                    user: data.username
                });
            }
            return res.data;
        });
    }
}

export default login;