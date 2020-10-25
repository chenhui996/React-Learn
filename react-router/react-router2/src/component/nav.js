import React from 'react';
import {  NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header className="header">
        <div className="wrap">
            <h1 id="logo">KaiKeBa</h1>
            <nav className="nav">
                <NavLink to="/" exact>首页</NavLink>
                <NavLink to="/about" exact>关于我们</NavLink>
                <NavLink to="/joinus" exact>加入我们</NavLink>
                <NavLink to="/list/1" exact>列表</NavLink>
            </nav>
        </div>
    </header>
  );
}

export default Nav;
