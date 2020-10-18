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
        title: "这是第1条数据",
        message: "这是数据1的内容",
        done: false,
      },
      {
        id: 1,
        title: "这是第2条数据",
        message: "这是数据2的内容",
        done: false,
      },
      {
        id: 2,
        title: "这是第3条数据",
        message: "这是数据3的内容",
        done: false,
      },
      {
        id: 3,
        title: "这是第4条数据",
        message: "这是数据4的内容",
        done: false,
      },
      {
        id: 24323123243,
        title: "这是第5条数据",
        message: "这是数据5的内容",
        done: false,
      },
    ],
    list: [],
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
      data,
    });
  };
  addList = (id, newList) => {
    let { list } = this.state;
    // list.push(newList);
    list[id] = newList;
    this.setState({
      list,
    });
  };
  removeList = (id) => {
    let { list } = this.state;
    delete list[id];
    this.setState({
      list,
    });
  };

  // 碰撞检测

  collide = (drag, id) => {
    let { list, data } = this.state;
    let dragRect = drag.getBoundingClientRect();
    let dragTo = -1; // 位置不变
    for (let listId in list) {
      // if( id == listId ){
      //   continue;
      // }
      let nowList = list[listId];
      let nowRect = nowList.getBoundingClientRect();
      if (
        dragRect.bottom >= nowRect.top - 10 &&
        dragRect.bottom <= nowRect.bottom
      ) {
        dragTo = Number(listId);
        console.log("碰撞了", listId - 1 , "至", listId, "之间" );
        break;
      }
      else if((data.findIndex((item) => item.id === Number(listId))) === data.length - 1){
        console.log(data.findIndex((item) => item.id === Number(listId)));
        let now = data.filter((item) => item.id === id)[0];
        data = data.filter((item) => item.id !== id);
        data.push(now);
        this.setState({
          data
        })
        // console.log("碰撞了", Number(listId) + 1);
      }
      // else if(){
      //   console.log(Number(listId), list[list.length - 1].id);
      // }
    }
    if(dragTo > -1){
      let now = data.filter((item) => item.id === id)[0];
      data = data.filter((item) => item.id !== id);
      let toIndex = data.findIndex((item) => item.id ===  dragTo);
      // console.log(toIndex);
      data.splice(toIndex,0,now);
      this.setState({
        data
      })
    }
  };

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
              collide={this.collide}
              addList={this.addList}
              removeList={this.removeList}
            />
            <Stats
              data={data}
              removeDone={this.removeDone}
              changeAllDone={this.changeAllDone}
            />
          </Fragment>
        )}
      </section>
    );
  }
}

export default App;
