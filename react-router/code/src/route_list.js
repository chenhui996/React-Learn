import React from "react";
import View404 from "./view/404View";
import ListView from "./view/list";
import { Redirect } from "react-router-dom";

const types = ["all","good", "share", "ask"];

const route_list = [
  {
    path: ["/", "/:type", "/:type/:page"],
    exact: true,
    render(props) {
      const { type="all", page=1 } = props.match.params;
      if(types.includes(type) && page > 0 && parseInt(page) + "" == page + ""){
        return <ListView {...props} />;
      }
      else if(Number(type)){
        return <Redirect to={`/all/${type}`} />;
      }
      // return <Redirect to="/undefined" />;
      return <View404 {...props} />;
    },
  },
  {
    path: "/undefined",
    exact: true,
    render(props) {
      console.log("dsz");
      return <View404 {...props} />;
    },
  },
];

const list_navs = [
  {
    to: "/all",
    exact: false,
    title: "全部",
    isActive(pathname) {
      return pathname === "/" || pathname.slice(0,4) === "/all";
    },
  },
  {
    to: "/good",
    exact: false,
    title: "精华",
  },
  {
    to: "/share",
    exact: false,
    title: "分享",
  },
  {
    to: "/ask",
    exact: false,
    title: "问答",
  },
];

export { route_list, list_navs };
