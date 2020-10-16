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
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.edit && this.state.edit) {
      this.editText.current.focus();
    }
  }
  render() {
    let { data, remove, changeDone, editMessage } = this.props;
    let { id, done, title, message } = data;
    let { edit, val } = this.state;
    return (
      <li className={(done ? "done" : "") + (edit ? "editing" : "")}>
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
                edit:false
              });
            } else {
              this.setState({
                val: message,
                edit:false
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
