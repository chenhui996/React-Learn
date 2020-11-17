import React, { useState } from "react";
import { connect } from "react-redux";
import login from "../../store/action/login";
import { withRouter } from "react-router-dom"; // 给一些 普通的组件 加路由信息, 在props即可看到当前页的 路由信息
import { useBack } from "../../common/hooks/index";

function LoginBox(props) {
  // console.log(props);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [vcode, setVcode] = useState("");
  const [vcodeShow, setVcodeShow] = useState(false);
  const [vcodeSrc, setVcodeSrc] = useState("/miaov/user/verify?" + Date.now()); // 这是get 还是 post？（新手问题）
  const back = useBack(props.history);
  const { setDeg, registerTxt } = props;
  const { registerUsername, registerPassword } = registerTxt;
  if (!user && !password && registerUsername && registerPassword) {
    setUser(registerUsername);
    setPassword(registerPassword);
  }

  function toLogin() {
    props
      .dispatch(
        login({
          verify: vcode,
          username: user,
          password: password,
        })
      )
      .then((data) => {
        setTimeout(() => {
          if (data.code !== 0) {
            alert(data.msg);
            setVcodeSrc("/miaov/user/verify?" + Date.now());
          } else {
            back();
            alert("登陆成功");
          }
        }, 100);
      });
  }

  return (
    <div className="login_box">
      <figure className="user_img">
        <img src={require("../../common/images/user_img.png")} alt="" />
        <figcaption>如有账号，请直接登录</figcaption>
      </figure>
      <div className="login_form">
        <p>
          <input
            type="text"
            placeholder="用户名"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </p>
        <p className="clearfix">
          <input
            type="text"
            placeholder="验证码"
            value={vcode}
            onChange={(e) => {
              setVcode(e.target.value);
            }}
            onFocus={() => {
              setVcodeShow(true);
            }}
            className="verifyCode"
          />
          {vcodeShow ? (
            <img
              className="verify"
              src={vcodeSrc}
              alt=""
              onClick={() => {
                setVcodeSrc("/miaov/user/verify?" + Date.now());
              }}
            />
          ) : (
            ""
          )}
        </p>
        <button className="form_btn" onClick={toLogin}>
          登录
        </button>
        <p className="form_tip">
          没有帐号？
          <button className="btn_login"
            onClick={() => {
              setDeg(-180);
            }}
          >
            立即注册
          </button>
        </p>
      </div>
    </div>
  );
}

export default connect((res) => res)(withRouter(LoginBox)); // 这样，LoginBox 组件的porps，即有dispatch
