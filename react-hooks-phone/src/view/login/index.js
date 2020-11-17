import React, { useState } from "react";
import "../../common/css/login.css";
import LoginBox from "./login";
import RegisterBox from "./register";

function Login() {
  const [deg, setDeg] = useState(0);
  const [registerTxt, setRegisterTxt] = useState({
    registerUsername: "",
    registerPassword: ""
  });
  function getRegisterTxt(user,password){
    // console.log(user,password);
    setRegisterTxt({
      ...registerTxt,
      registerUsername: user,
      registerPassword: password
    });
  }
  return (
    <div id="login_boxWrap">
      <h2 className="login_register">
        <span>登陆&amp;注册</span>
      </h2>
      <div className="login_register_box">
        <div
          className="box"
          style={{
            transform: `rotateY(${deg}deg)`,
          }}
        >
          <LoginBox registerTxt={registerTxt} setDeg={setDeg} />
          <RegisterBox getRegisterTxt={getRegisterTxt} setDeg={setDeg} />
        </div>
      </div>
    </div>
  );
}

export default Login;
