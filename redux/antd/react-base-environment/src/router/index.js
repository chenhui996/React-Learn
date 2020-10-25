import React from "react";
import IndexPage from "../view/index/index";
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

export { routes };
