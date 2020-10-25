import React from "react";
import IndexPage from "../view/index";
import UndefindPage from "../view/404";

const routes = [
  {
    path: "/",
    excat: true,
    render(props) {
      return <IndexPage />;
    },
  },
  {
    path: "",
    excat: false,
    render(props) {
      return <UndefindPage {...props} />;
    },
  },
];

const navs = [
  {
    title: "首页",
    to: "/",
  },
  {
    title: "新手入门",
    to: "/getstart",
  },
  {
    title: "API",
    to: "/api",
  },
  {
    title: "关于",
    to: "/about",
  },
];

const indexNavs = [
  {
    title: "全部",
    to: "/?tab=all",
  },
  {
    title: "精华",
    to: "/?tab=good",
  },
  {
    title: "分享",
    to: "/?tab=share",
  },
  {
    title: "问答",
    to: "/?tab=ask",
  },
  {
    title: "招聘",
    to: "/?tab=job",
  },
  {
    title: "客户端测试",
    to: "/?tab=dev",
  },
];

export { routes, navs, indexNavs };
