import React, { Component } from "react";

export default class AddTodo extends Component {
  state = {
    title: "",
    message: "",
    done: false
  };
  render() {
    let { add } = this.props;
    let { title, message, done } = this.state;
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
        <button onClick={() => {
          if(title !== ""){
            add(title, message, done);
              this.setState({
                title: "",
                message: "",
                done: false
              });
          }
        }}>提交留言</button>
      </div>
    );
  }
}
