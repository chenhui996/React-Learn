import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

function Nav(props) {
  const { data, theme = "light", style = {}, selected = () => {} } = props;

  // 激活状态 selectedKeys
  const location = useLocation();
  let key = selected(location);

  // 渲染视图 JSX
  return (
    <Menu mode="horizontal" theme={theme} selectedKeys={[key]} style={style}>
      {data.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default Nav;
