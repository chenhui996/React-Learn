import React, { Component } from "react";
import "./App.css";
import Title from "./title.js";
import AddTodo from "./addTodo.js";
import List from "./list.js";

class App extends Component {
  state = {
    data: [
      {
        id: 0,
        title: "this is first todo",
        message:
          "The 1896 Cedar Keys hurricane was a powerful tropical cyclone that devastated much of the East Coast of the United States, starting with Florida's Cedar Keys, near the end of September. The storm's rapid movement allowed it to maintain much of its intensity after landfall, becoming one of the costliest United States hurricanes at the time.",
      },
    ],
  };
  add = (newTodo, newMessage) => {
    let { data } = this.state;
    data.push({
      id: Date.now(),
      title: newTodo,
      message: newMessage,
    });
    this.setState({
      data
    })
  };
  remove = (id) => {
    let { data } = this.state;
    this.setState({
      data: data.filter(item => item.id !== id)
    })
  }
  render() {
    let { data } = this.state;
    return (
      <div>
        <section className="wrap">
          <Title />
          <AddTodo add={this.add} />
          <List data={data} remove={this.remove} />
        </section>
      </div>
    );
  }
}

export default App;
