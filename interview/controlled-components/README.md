# React 之受控组件和非受控组件

- 在 React 中，所谓 '受控组件' 和 '非受控组件':
  - 是针对 '表单' 而言的;

## 受控组件

### 表单受控组件

- '表单元素' 依赖于 '状态(State)':
  - 表单元素需要:
    - 默认值 '实时映射' 到 '状态(State)' 的时候:
      - 就是受控组件;
        - 这个和双向绑定相似;
- 受控组件:
  - '表单元素' 的 '修改' 会 '实时映射' 到 '状态值' 上;
    - 此时就可以对:
      - 输入的内容进行校验;
- 受控组件:
  - 只有继承 React.Component 才会有状态;?
- 受控组件:
  - 必须要在 '表单上使用' :
    - onChange 事件来 '绑定对应的事件';

```js
class Control extends React.Component {
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
```

- 怎么样，这个效果是不是和双向绑定很相似？

### 注意：

- 在受控组件中：
  - 如果没有给输入框绑定 onChange 事件:
    - 将会收到 react 的警告;
- 并且此时输入框除了默认值:
  - 是无法输入其他任何参数的;

---

- 输入框没有绑定 onChange 事件无法修改输入框中的值:
  - 会触发 react 警告

## 非受控组件

- '非受控组件' 即 '不受状态的控制':
  - 获取数据就是相当于:
    - 操作 DOM;
- 非受控组件的 '好处' 是:
  - 很容易和第三方组件结合;

### 获取输入框中的值的两种方法

- ref 功能是一样，只是写法不一样，可以让我们操作 DOM;

#### 第一种方式是函数

- 在虚拟 DOM 节点上使用 ref;
  - 并使用函数;
    - 将函数的参数挂载到实例的属性上;

```js
handleSubmit = (e) => {
    // 阻止原生默认事件的触发
    e.preventDefault();
    console.log(this.username.value);
}
render() {
    return (
        <form onSubmit={this.handleSubmit}>
            {/* 将真实的DOM，username是输入框中输入的值赋值给组件实例上
                这样，在页面表单提交的时候就可以通过this.username.value获取到输入框输入的值
            */}
            用户名<input
                name="username"
                type="text"
                ref={username=>this.username=username}
            /><br />
        </form>
    )
}
```

#### 第二种方式：通过构造函数声明的方式

- react 16.3 新语法;
- 实例的构造函数 constructor 这创建一个引用;
- 在虚拟 DOM 节点上声明一个 ref 属性:
  - 并且将创建好的引用赋值给这个 ref 属性;
- react 会自动将输入框中输入的值:
  - 放在实例的 second 属性上;
```js
constructor(){
    super();
    // 在构造函数中创建一个引用
    this.second=React.createRef();
}
handleSubmit = (e) => {
    // 阻止原生默认事件的触发
    e.preventDefault();
    console.log(this.second.current.value);
}
render() {
    return (
        <form onSubmit={this.handleSubmit}>
            {/* 自动将输入框中输入的值放在实例的second属性上 */}
            密码<input
                name="password"
                type="text"
                ref={this.second}
            /><br />
        </form>
    )
}
```

- 好了，react关于表单的受控组件和非受控组件就先整理到这里，有问题的话，欢迎大家留言沟通！

---

- 作者：tenor
- 链接：https://juejin.im/post/6844903629493633038
- 来源：掘金
- 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
