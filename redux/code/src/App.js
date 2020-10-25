import React, { Fragment } from "react";
import Title from "./component/title";
import AddTodo from "./component/addTodo";
import List from "./component/list";
import Stats from "./component/stats";
import { useSelector } from "react-redux";

function App(){
    const  data  = useSelector(state => state.data);
    return (
      <div id="todoapp">
        <Title />
        <AddTodo />
        {data.length > 0 && (
            <Fragment>
              <List />
              <Stats />
            </Fragment>
          )}
      </div>
    );
  }

export default App;
