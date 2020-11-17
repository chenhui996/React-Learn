import React from "react";
import { Switch, Route } from "react-router-dom";
import routerList from "./router_list";

// 返回主路由
function IndexRoute() {
  return (
    // 用 Switch, 实现路由页面间的切换
    <Switch>
      {routerList.map((routerItem, index) => {
        return (
          <Route
            path={routerItem.path}
            exact={routerItem.exact}
            render={routerItem.render}
            key={index}
          />
        );
      })}
    </Switch>
  );
}
export default IndexRoute;
