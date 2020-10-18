import React, { PureComponent, createRef } from "react";
export default class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      val: props.data.message,
    };
  }
  editText = createRef();

  // 扩展开始的地方！
  todo = createRef();

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.edit && this.state.edit) {
      this.editText.current.focus();
    }
  }
  componentWillUnmount(){
    let { removeList, data } = this.props;
    removeList(data.id);
  }
  componentDidMount(){
    let { collide, addList, data } = this.props;
    let todo = this.todo.current;
    addList(data.id, todo);
    (todo.firstElementChild).addEventListener("mousedown", (e) => {
      // console.log("mousedown", todo);
      let startMouse = e.clientY;

      let newTodo = todo.cloneNode(true);
      let t = todo.getBoundingClientRect().top;
      newTodo.classList.add("drag");
      newTodo.style.left = todo.getBoundingClientRect().left + "px";
      newTodo.style.top = t + "px";
      document.body.appendChild(newTodo);

      // move
      let move = (e) => {
        let nowMouse = e.clientY;
        // 移动距离
        let disMouse = nowMouse - startMouse;
        newTodo.style.top = t + disMouse + "px";
      }
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        collide(newTodo, data.id);
        document.removeEventListener("mousemove", move);
        document.body.removeChild(newTodo);
      },{once:true});

      e.preventDefault();
    });
  }
  render() {
    let { data, remove, changeDone, editMessage } = this.props;
    let { id, done, title, message } = data;
    let { edit, val } = this.state;
    return (
      <li
        className={(done ? "done" : "") + (edit ? "editing" : "")}
        ref={this.todo}
      >
        <h3>{title}</h3>
        <input
          type="checkbox"
          checked={done}
          onChange={({ target }) => {
            changeDone(id, target.checked);
          }}
        />
        <p
          onDoubleClick={() => {
            this.setState({
              edit: true,
            });
          }}
        >
          {message}
        </p>
        <textarea
          value={val}
          ref={this.editText}
          onChange={({ target }) => {
            this.setState({
              val: target.value,
            });
          }}
          onBlur={() => {
            if (val !== "") {
              editMessage(id, val);
              this.setState({
                edit: false,
              });
            } else {
              this.setState({
                val: message,
                edit: false,
              });
            }
          }}
        ></textarea>
        <a
          onClick={() => {
            remove(id);
          }}
        >
          删除
        </a>
      </li>
    );
  }
}
