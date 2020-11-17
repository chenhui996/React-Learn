import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// react中跳转不用 a，用 Link
import { Link, withRouter } from "react-router-dom";
import { useBack } from "../hooks/index";

import isLogin from "../../store/action/isLogin";
import logout from "../../store/action/logout";

function Header(props) {
  const back = useBack(props.history);
  const path = props.location.pathname;
  const { user, changeShow } = props;
  const [isBtnShow, setBtnShow] = useState(false);
  // console.log(user);
  useEffect(() => {
    props.dispatch(isLogin());
  }, [props]);
  function getUser() {
    if (path === "/login") {
      return "";
    }
    if (user) {
      return (
        <span className="header-btn-right">
          <span className="header-user" onClick={() => {
            setBtnShow(!isBtnShow);
          }}>{user}</span>
          <span
            className="header-logout-btn"
            style={{
              display: isBtnShow? "block": "none"
            }}
            onClick={() => {
              props.dispatch(logout());
            }}
          >
            退出
          </span>
        </span>
      );
    }
    return <Link className="user" to="/login" />;
  }
  return (
    <header id="header">
      <nav className="menu">
        {/* 三元 显示 两按钮 */}
        {path === "/login" ? (
          <button
            className="header-btn-left iconfont icon-back btn_login"
            onClick={() => {
              back();
            }}
          ></button>
        ) : (
          <button className="header-btn-left iconfont icon-hycaidan  btn_login" onClick={() => {
            changeShow()
          }}></button>
        )}
      </nav>
      <h1 className="logo">miaov.com</h1>
      {/* <Link className="user" to="/login" /> */}
      {getUser()}
    </header>
  );
}

export default connect((state) => {
  return { user: state.getUser };
})(withRouter(Header));
