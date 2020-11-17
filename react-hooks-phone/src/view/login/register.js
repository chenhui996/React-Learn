import React, { useState } from "react";
import { connect } from "react-redux";
import register from "../../store/action/register";
import { withRouter } from "react-router-dom"; // 给一些 普通的组件 加路由信息, 在props即可看到当前页的 路由信息

function RegisterBox(props) {
  // console.log(props);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [vcode, setVcode] = useState("");
  const [vcodeShow, setVcodeShow] = useState(false);
  const [vcodeSrc, setVcodeSrc] = useState("/miaov/user/verify?" + Date.now()); // 这是get 还是 post？（新手问题）
  const { setDeg, getRegisterTxt } = props;

  function toRegister() {
    if (vcode && user && password && password2) {
      props
        .dispatch(
          register({
            verify: vcode,
            username: user,
            password: password,
            repassword: password2,
          })
        )
        .then((data) => {
          alert(data.msg);
          // console.log(data);
          setTimeout(() => {
            if (data.code === 0) {
              setDeg(0);
              getRegisterTxt(user,password);
            }
            setVcodeSrc("/miaov/user/verify?" + Date.now());
          }, 100);
        });
    }
  }

  return (
    <div className="register_box">
      <h3>注册账号</h3>
      <div className="register_form">
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
        <p>
          <input
            type="password"
            placeholder="确认密码"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
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
        <button className="form_btn" onClick={toRegister}>
          马上注册
        </button>
        <p className="form_tip">
          已有帐号？
          <button className="btn_login"
            onClick={() => {
              setDeg(0);
            }}
          >
            立即登陆
          </button>
        </p>
      </div>
    </div>
  );
}

export default connect((res) => res)(withRouter(RegisterBox)); // 这样，LoginBox 组件的porps，即有dispatch
