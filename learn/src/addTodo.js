import React, { Component } from "react";

export default class addTodo extends Component {
  state = {
    title: "",
    message: "",
  };
  render() {
    let { add } = this.props;
    let { title, message } = this.state;
    return (
      <div className="addMessage">
        <input
          type="text"
          placeholder="请输入昵称"
          value={title}
          onChange={({ target }) => {
            this.setState({
              title: target.value,
            });
          }}
        />
        <textarea
          placeholder="请输入留言"
          value={message}
          onChange={({ target }) => {
            this.setState({
              message: target.value,
            });
          }}
        ></textarea>
        <button
          onClick={() => {
            if (title !== "") {
              add(title, message);
              this.setState({
                title: "",
                message: "",
              });
            }
          }}
        >
          提交留言
        </button>
      </div>
    );
  }
}
