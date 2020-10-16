import React, { Component } from "react";

export default class Stats extends Component {
  state = {
    done: false,
  };
  render() {
    let { data, removeDone, changeAllDone } = this.props;
    let { done } = this.state;
    let doneDataLen = data.filter((dataItem) => dataItem.done).length;
    return (
      <div className="sum">
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={({ target }) => {
              this.setState({
                done: target.checked,
              });
              changeAllDone(target.checked);
            }}
          />
          <span>选中全部</span>
        </label>
        <a
          onClick={() => {
            removeDone();
          }}
        >
          删除选中项
        </a>
        <p>
          当前选中<span> {doneDataLen} </span>项，共{data.length}条留言
        </p>
      </div>
    );
  }
}
