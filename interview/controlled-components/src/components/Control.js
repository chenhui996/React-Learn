import React from "react";

export default class Control extends React.Component {
  // 这样的写法 也是声明 在实例上的 对象
  state = {
    // 给组件状态设置默认值，目的: 在实时修改时进行校验
    username: "cain",
    pwd: "zrrdw",
  };

  // e为原生的事件 绑定的对象
  handleChange = (e) => {
    // 获取原生对象上的属性
    let name = e.target.name;
    // 根据表单元素的 name 名称进行匹配
    // 比如用户名的 name 是 username，那新输入的值将更新原来的值
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.username}</p>
        用户名:
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <p>{this.state.pwd}</p>
        密码:
        <input
          name="pwd"
          type="text"
          value={this.state.pwd}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
