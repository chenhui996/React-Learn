import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { nav_list } from "../route_list";

function Nav() {
  let { pathname } = useLocation();
  return (
    <header className="header">
      <div className="wrap">
        <h1 id="logo">KaiKeBa</h1>
        <nav className="nav">
          {nav_list.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.to}
                exact={item.exact}
                isActive={item.isActive ? () => {
                  return item.isActive(pathname);
                } : null}
              >
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
