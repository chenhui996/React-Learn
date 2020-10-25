import React from 'react';
import Index from "./view/index";
import About from "./view/about";
import JoinUs from "./view/joinUs";
import Nav from "./component/nav";
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Nav />
      <Route
        path="/"
        exact
        component={Index}
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
    </div>
  );
}

export default App;
