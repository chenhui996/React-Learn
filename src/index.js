import React from "react";
import ReactDom from "react-dom";

//预先定义好一个todoList数组字面量，之后dom渲染好后会通过componentWillMount函数将其更新到state上，然后呈现在页面上，展示出来;
const todoList = ["阿辉", "阿辉学习笔记", "阿辉难顶", "阿辉github是chenhui996"];

class Todo extends React.Component {
  render() {
    // const element = <li>等2s才出来, {this.props.content}</li>;
    // return element;
    if (this.props.index % 2 === 0) {
      return <li style={{ color: "red" }}>Hello, {this.props.content}</li>;
    } else {
      return <li style={{ color: "orange" }}>Hello, {this.props.content}</li>;
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    //初始化state 里的todoList;
    this.state = {
      todoList: [],
      nowTodo: "",
    };
  }
  //设定dom渲染后的函数：2s后将使用this.setState({todoList: todoList})方法来将外面定义好的todoList的数据更新到上面我们在constructor里初始化的state里面;
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        todoList: todoList,
      });
    }, 2000);
  }
  //清除定时器，原因：占内存;
  componentWillMount() {
    clearTimeout(this.timer);
  }

  handleChange(e) {
    this.setState({
      nowTodo: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault(e);
    const newTodoList = this.state.todoList;
    newTodoList.push(this.state.nowTodo);
    //个人主观：拼接总感觉没有安全感。还是习惯用push;
    // const newTodoList = this.state.todoList.concat(this.state.nowTodo);
    this.setState({
      nowTodo: "",
      todoList: newTodoList,
    });
  }

  //更新constructor里的state的数据;
  render() {
    return (
      <div>
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" onChange={(e) => this.handleChange(e)} />
            <button type="submit">提交</button>
          </form>
          <ul>
            {this.state.todoList.map((todo, index) => (
              <Todo content={todo} key={index} index={index} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
