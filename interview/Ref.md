# Ref

### 引言

- 本篇从 React Refs 的:
  - 使用场景
  - 使用方式
  - 注意事项
- 到 createRef 与 Hook useRef 的对比使用;
- 最后以 React createRef 源码结束;

---

- 剖析整个 React Refs;
- 关于 React.forwardRef 会在 '另' 一篇文章深入探讨;

## 一、Refs

- React 的 '核心思想' 是:
  - 每次对于界面 state 的改动:
    - 都会重新渲染整个 Virtual DOM;
      - 然后'新老'的两个 Virtual DOM 树进行 diff（协调算法）;
        - 对比出变化的地方:
          - 然后通过 render 渲染到实际的 UI 界面;

---

- 使用 Refs:
  - 为我们提供了一种:
    - 绕过 '状态更新' 和 '重新渲染' 时:
      - 访问元素的方法;
  - 这在 '某些用例' 中很有用;
    - 但不应该作为 props 和 state 的替代方法;

---

- 在项目开发中:
  - 如果我们可以使用:
    - 声明式
    - 提升 state 所在的组件层级（状态提升）
  - 方法来更新组件;
    - 最好不要使用 refs;

### 使用场景

##### 管理焦点（如文本选择）或处理表单数据:

- Refs 将管理文本框当前焦点选中;
- 或文本框其它属性;

---

- 在大多数情况下,我们推荐使用:
  - '受控组件' 来处理 '表单数据';
    - 在一个受控组件中:
      - '表单数据' 是由 'React 组件' 来管理的;
        - 每个 '状态更新' 都编写 '数据处理' 函数;
- 另一种 '替代方案' 是:
  - 使用非受控组件:
    - 这时 '表单数据' 将交由:
      - DOM 节点来处理;
  - 要编写一个非受控组件:
    - 就需要使用 Refs :
      - 来从 DOM 节点中 '获取' 表单数据;

```js
import React from "react";

class NameForm extends React.Component {
  constructor(props) {
    super(props); // super()是必须，虽然用不到props，但是，还是放一下，完美一点;
    this.input = React.createRef();
  }

  handleSubmit = (e) => {
    console.log("A name was submitted:" + this.input.current.value);
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
```

- 因为 '非受控组件' 将 '真实数据' 储存在 'DOM 节点中';
  - 所以再使用 '非受控组件' 时:
    - 有时候反而更容易 '同时集成' React 和非 React 代码;
- 如果你不介意代码美观性;
- 并且希望快速编写代码;
- 使用 '非受控组件' 往往可以减少你的代码量;
  - 否则，你应该使用受控组件;

##### 媒体播放：

- 基于 React 的:
  - 音乐或视频播放器;
    - 可以利用 Refs 来管理:
      - 当前状态（播放/暂停），或管理播放进度等;
        - 这些更新不需要进行状态管理;

##### 触发强制动画：

- 如果要在元素上触发强制动画时:
  - 可以使用 Refs 来执行此操作;

##### 集成第三方 DOM 库

### 使用方式

- Refs 有 三种实现：

#### 1、方法一：通过 createRef 实现
