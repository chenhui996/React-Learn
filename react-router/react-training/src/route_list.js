import React from "react";
import Index from "./view/index";
import About from "./view/about";
import JoinUs from "./view/joinUs";
import View404 from "./view/404View";
import ListView from "./view/list";
import { Redirect } from "react-router-dom";

const types = ["good", "share", "ask"];

const nav_list = [
  {
    to: "/",
    exact: true,
    title: "首页",
    isActive(pathname) {
      return pathname === "/" || pathname === "/home";
    },
  },
  {
    to: "/about",
    exact: true,
    title: "关于我们",
  },
  {
    to: "/joinus",
    exact: true,
    title: "加入我们",
  },
  {
    to: "/list",
    exact: false,
    title: "列表",
  },
];

const route_list = [
  {
    path: ["/", "/home"],
    exact: true,
    render(props) {
      return <Index {...props} />;
    },
  },
  {
    path: "/about",
    exact: true,
    render(props) {
      return <About {...props} />;
    },
  },
  {
    path: "/joinus",
    exact: true,
    render(props) {
      return <JoinUs {...props} />;
    },
  },
  {
    path: ["/list", "/list/:type", "/list/:type/:page"],
    exact: true,
    render(props) {
      const { type="good", page=1 } = props.match.params
      if(types.includes(type) && page > 0 && parseInt(page) + "" === page + ""){
        return <ListView {...props} />;
      }
      return <Redirect to="/undefined" />;
    },
  },
  {
    path: "",
    render(props) {
      return <View404 {...props} />;
    },
  },
];

const list_navs = [
  {
    to: "/list/good",
    exact: false,
    title: "精华",
    isActive(pathname) {
      return pathname === "/list" || pathname.slice(0, 10) === "/list/good";
    },
  },
  {
    to: "/list/share",
    exact: false,
    title: "分享",
  },
  {
    to: "/list/ask",
    exact: false,
    title: "问答",
  },
];

export { route_list, nav_list, list_navs };
