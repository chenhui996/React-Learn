// 异步的action: login
import HTTP from "./http";
function isLogin(){
    return function(dispatch){
        return HTTP.post("/user/islogin").then(res => {
            // console.log(res.data.code);
            if(res.data.code === 0){
                dispatch({
                    type: "LOGIN",
                    user: res.data.username
                });
            }
            // return res.data.username;
        });
    }
}

export default isLogin;