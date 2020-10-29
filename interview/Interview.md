# [ React ] 面试题汇总

## 基础篇

### React 中 keys 的作用是什么？

- Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

```js
render () {
  return (
    <ul>
      {this.state.todoItems.map(({item, key}) => {
        return <li key={key}>{item}</li>
      })}
    </ul>
  )
}
```

- react 利用 key 来识别组件:
  - 它是一种'身份标识标识'，相同的 key react 认为是同一个组件;
    - 这样后续相同的 key 对应组件都不会被创建;
- 有了 key 属性后:
  - 就可以与'组件'建立了一种'对应关系';
    - react 根据 key 来决定:
      - 是'销毁重新创建组件'还是'更新组件';
- key 相同，若'组件属性'有所变化:
  - 则 react 只更新'组件对应的属性';
  - 没有变化则不更新;
- key 值不同:
  - 则 react 先销毁该组件:
    - 有状态组件的 componentWillUnmount 会执行;
  - 然后重新创建该组件:
    - 有状态组件的 constructor 和 componentWillUnmount 都会执行

### 调用 setState 之后发生了什么？

- 在代码中调用 setState 函数之后:
  - React 会将:
    - 传入的参数对象
    - 组件当前的状态;
  - 合并;
  - 然后触发所谓的'调和过程';
- 经过'调和过程':
  - React 会以'相对高效'的方式:
    - 根据'新的状态'构建'React 元素树';
    - 并且着手'重新渲染'整个 UI 界面;
- 在 React 得到元素树之后:
  - React 会自动计算出:
    - 新的树与老树的节点差异;
  - 然后根据差异:
    - 对界面进行最小化重渲染;
- 在'差异计算算法'中:
  - React 能够相对精确地知道:
    - 哪些位置发生了改变;
    - 以及应该如何改变;
  - 这就保证了'按需更新'，而不是全部'重新渲染';

### 触发多次 setstate，那么 render 会执行几次？

- 多次 setState 会合并为一次 render:
  - 因为 setState 并不会立即改变 state 的值;
    - 而是将其放到一个任务队列里;
    - 最终将多个 setState 合并，一次性更新页面;
- 所以我们可以在代码里多次调用 setState:
  - 每次只需要关注当前修改的字段即可;

### [补充] react 中如何对 state 中的数据进行修改？setState 为什么是一个异步的？

- 修改数据通过 this.setState(参数 1,参数 2);
- this.setState 是一个异步函数:
  - 参数 1 : 是需要修改的数据是一个对象;
  - 参数 2 : 是一个回调函数:
    - 可以用来验证数据是否修改成功;
    - 同时可以获取到数据更新后的 DOM 结构:
      - 等同于 componentDidMount;
- this.setState 中的第一个参数:
  - 除了可以写成一个对象以外;
  - 还可以写成一个函数;
    - 函数中第一个值为 prevState;
    - 第二个值为 prePprops;

```js
this.setState((prevState, prePprops) => ({}));
```

### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象？

- 因为 this.props 和 this.state 的更新可能是异步的:
  - 不能依赖它们的值去计算下一个 state;

### 为什么 setState 是一个异步的？

- 当批量执行 state 的时候可以让 DOM 渲染的更快:
  - 也就是说多个 setstate 在执行的过程中还需要被合并

### this.setState 之后 react 做了哪些操作？

- shouldComponentUpdate:
  - 用某些逻辑判断是否继续渲染该组件
  - 返回 true 和 false
- componentWillUpdate:
  - 组件即将渲染;
- render:
  - 组件渲染;
- componentDidUpdate:
  - 组件渲染完成;

### 简述一下 virtual DOM （虚拟 dom）如何工作？

- 当数据发生变化:
  - 比如 setState 时:
    - 会引起组件重新渲染:
      - 整个 UI 都会以:
        - virtual dom 的形式:
          - 重新渲染;
- 然后收集差异:
  - 也就是 diff:
    - 新的 virtual dom
    - 老的 virtual dom
  - 差异;
- 最后把 '差异队列' 里的 '差异':
  - 比如:
    - 增加节点
    - 删除节点
    - 移动节点
  - 更新到真实的 DOM 上;

### 为什么虚拟 dom 会提高性能?

- 虚拟 dom 相当于:
  - 在 js 和真实 dom 中间加了一个缓存;
    - 利用 dom diff 算法避免了没有必要的 dom 操作;
      - 从而提高性能;
- 用 JavaScript 对象结构:
  - 表示 DOM 树的结构;
- 然后用这个树构建一个真正的 DOM 树:
  - 插到 '文档' 当中当 '状态变更' 的时候:
    - 重新构造一棵 '新的对象树';
- 然后用 '新的树' 和 '旧的树' 进行比较;
  - 记录两棵树差异;
    - 把 2 所记录的差异:
      - 应用到步骤 1 所构建的真正的 DOM 树上;
        - 视图就更新了;

### react diff 原理

- 把 '树形结构' 按照 '层级分解'，只比较 '同级元素';
- 给'列表结构'的每个'单元'添加唯一的 key 属性，方便比较;
- React 只会匹配:
  - 相同 class 的 component(这里面的 class 指的是组件的名字);
- 合并操作:
  - 调用 component 的 setState 方法的时候:
    - React 将其标记为 dirty:
      - 到 '每一个事件循环结束';
  - React 检查所有标记 dirty 的 component 重新绘制;
- 选择性子树渲染:
  - 开发人员可以重写 shouldComponentUpdate 提高 diff 的性能;

### React 中 refs 的作用是什么？（详细版本）

- Refs 是 React 提供给我们的:
  - 安全访问 DOM 元素;
  - 或者 '某个组件实例' 的 '句柄';
- 是 '父组件' 用来 '获取子组件' 的 'dom 元素' 的;
- 我们可以为 '元素' 添加 ref 属性:
  - 然后在 '回调函数' 中 '接受' 该元素在 'DOM 树' 中的 '句柄';
    - 该值会作为 '回调函数' 的 '第一个参数' 返回;

```js
class CustomForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={(input) => (this.input = input)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```
