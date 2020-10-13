import React, { Component } from "react";
import Todo from "./todo.js";

export default class List extends Component {
  render() {
    let { data, remove } = this.props;
    return (
      <ul className="messageList">
        {data.map((item, index) => {
          return <Todo key={index} data={item} remove={remove} />;
        })}
      </ul>
    );
  }
}
