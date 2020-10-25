import React, { useState } from 'react';
import Index from "./view/index";
import About from "./view/about";
import JoinUs from "./view/joinUs";
import Nav from "./component/nav";
import { Route, Switch } from 'react-router-dom';
import "./css/index.css";
import View404 from "./view/404View";
import ListView from "./view/list";

function App() {
  const [username, setUserName] = useState("cain");
  const [pagename, setPageName] = useState("翻页导航");
  return (
    <div>
      <Nav />
      <Switch>
        <Route
        path="/"
        exact
        render = {(routeProps) => {
          return <Index {...routeProps} username={username} />
        }}
      />
      <Route
        path="/about"
        exact
        component={About}
      />
      <Route
        path="/joinus"
        exact
        component={JoinUs}
      />
      <Route
        path="/list/:page"
        exact
        render = {(routeProps) => {
          return <ListView pagename={pagename} />
        }}
      />
      <Route 
        component={View404}
      />
      </Switch>
      
    </div>
  );
}

export default App;
