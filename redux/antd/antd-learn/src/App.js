import React from "react";
import { Layout, Affix } from "antd";
import Header from "./component/header";
import { routes } from "./router";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <div className="wrap">
        <Switch>
          {routes.map((item, index) => {
            return (
              <Route
                path={item.path}
                exact={item.excat}
                render={item.render}
                key={index}
              />
            );
          })}
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
