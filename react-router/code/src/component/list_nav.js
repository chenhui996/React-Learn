import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { list_navs } from "../route_list";

function ListNav() {
  let { pathname } = useLocation();
  return (
    <div className="wrap">
      <nav className="nav">
        {list_navs.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              exact={item.exact}
              isActive={
                item.isActive
                  ? () => {
                      return item.isActive(pathname);
                    }
                  : null
              }
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default ListNav;
