import React from "react";
import Index from "../view/index/index";
import Course from "../view/course/index";
import Lecturer from "../view/lecturer/index";
import Login from "../view/login/index";
import Work from "../view/work/index";

// 数组每一项 存放 对应的 router
const routerList = [
  {
    name: "首页",
    path: "/",
    exact: true,
    render(props) {
      // props为当前的路由信息, 传给相应的页面, 按需去取即可
      return <Index {...props} />;
    },
  },
  {
    name: "课程安排",
    path: "/course",
    exact: true,
    render(props) {
      // props为当前的路由信息, 传给相应的页面, 按需去取即可
      return <Course {...props} />;
    },
  },
  {
    name: "讲师团队",
    path: "/lecturer",
    exact: true,
    render(props) {
      // props为当前的路由信息, 传给相应的页面, 按需去取即可
      return <Lecturer {...props} />;
    },
  },
  {
    name: "登陆注册",
    path: "/login",
    exact: true,
    render(props) {
      // props为当前的路由信息, 传给相应的页面, 按需去取即可
      return <Login {...props} />;
    },
  },
  {
    name: "作品详情",
    path: "/work",
    exact: true,
    render(props) {
      // props为当前的路由信息, 传给相应的页面, 按需去取即可
      return <Work {...props} />;
    },
  },
];

export default routerList;
