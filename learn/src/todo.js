import React, { Component } from "react";

export default class Todo extends Component {
  render() {
    let { data, remove } = this.props;
    return (
      <li>
        <h3>{data.title}</h3>
        <p>{data.message}</p>
        <a onClick={() => {
          remove(data.id);
        }}>删除</a>
      </li>
    );
  }
}
