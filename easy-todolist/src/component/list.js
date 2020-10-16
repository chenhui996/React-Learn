import React, { Component } from "react";
import Todo from "./todo";

export default class List extends Component {
  render() {
    let { data } = this.props;
    return (
      <ul className="messageList">
        {data.map((item) => {
          return <Todo {...this.props} data={item} key={item.id} />
        })}
      </ul>
    );
  }
}
