import React, { Component, Fragment } from "react";
import "./App.css";
import Title from "./component/title";
import AddTodo from "./component/addTodo";
import List from "./component/list";
import Stats from "./component/stats";

class App extends Component {
  state = {
    data: [
      {
        id: 0,
        title: "昵称",
        message:
          "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留",
        done: false,
      },
      {
        id: 1,
        title: "昵称2",
        message:
          "留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留",
        done: false,
      },
    ],
  };
  add = (newTitle, newMessage, newDone) => {
    let { data } = this.state;
    data.push({
      id: Date.now(),
      title: newTitle,
      message: newMessage,
      done: newDone,
    });
    this.setState({
      data,
    });
  };
  remove = (id) => {
    let { data } = this.state;
    this.setState({
      data: data.filter((item) => item.id !== id),
    });
  };
  removeDone = () => {
    let { data } = this.state;
    this.setState({
      data: data.filter((item) => !item.done),
    });
  };
  changeDone = (id, done) => {
    let { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        // data[i].done = done;
        data[i] = { ...data[i], done };
        break;
      }
    }
    this.setState({
      data: data,
    });
  };
  editMessage = (id, message) => {
    let { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        // data[i].done = done;
        data[i] = { ...data[i], message };
        break;
      }
    }
    this.setState({
      data: data,
    });
  };
  // stats
  changeAllDone = (done) => {
    let { data } = this.state;
    // data.forEach((item) => {
    //   return item = {...item, done};
    // });
    for (let i = 0; i < data.length; i++) {
        data[i] = { ...data[i], done };
    }
    this.setState({
      data
    });
  }
  render() {
    let { data } = this.state;
    return (
      <section className="wrap">
        <Title />
        <AddTodo add={this.add} />
        {data.length > 0 && (
            <Fragment>
              <List
                data={data}
                remove={this.remove}
                changeDone={this.changeDone}
                editMessage={this.editMessage}
              />
              <Stats data={data} removeDone={this.removeDone} changeAllDone={this.changeAllDone} />
            </Fragment>
          )}
      </section>
    );
  }
}

export default App;
