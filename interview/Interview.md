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
  - 它是一种身份标识标识，相同的 key react 认为是同一个组件;
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
