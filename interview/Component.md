# React 类组件、函数组件、纯组件

## Class Component VS. Functional Component

- 根据 React 官网，React 中的组件可分为:
  - 函数式组件（Functional Component）
  - 类组件（Class Component）

### Class Component

- 这是一个我们熟悉的类组件:

```js
// Class Componment
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Functional Component

- 而函数式组件则更加简洁:

```js
// Functional Componment
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Stateless Component

- 而 '函数式组件' 在以往, 我们也称其为:
  - 无状态组件（Stateless Component）;
- 因为在函数组件中:
  - 无法使用 state;
  - 无法使用 '组件的生命周期方法';
- 一个函数组件:
  - 只负责接收 props;
    - 渲染 DOM;
    - 而不去关注其他逻辑;

---

- 这类组件有以下几个特点:
  - 只负责接收 props，渲染 DOM;
  - 没有 state
  - 不能访问生命周期方法
  - 不需要声明类:
    - 可以避免 extends 或 constructor 之类的代码;
      - 语法上更加简洁;
  - 不会被实例化:
    - 因此不能直接传 ref;
      - 可以使用 React.forwardRef 包装后再传 ref;
  - 不需要显示声明 this 关键字:
    - 在 ES6 的 '类声明' 中:
      - 往往需要将 '函数的 this 关键字' 绑定到 '当前作用域';
        - 而因为函数式声明的特性:
          - 我们不需要再强制绑定;
  - 更好的性能表现:
    - 因为函数式组件中:
      - 并 '不需要' 进行 '生命周期的管理' 与 '状态管理';
        - 因此 React 不需要:
          - 进行某些 '特定的检查' 或者 '内存分配';
            - 从而保证了更好地性能表现;

---

- 无状态组件的代码更加 '简单清晰' 且 '易于快速实现';
  - 它们适用于非常小的 UI 界面:
    - 即这些组件的重新渲染的成本很小;

## Class Component VS. Pure Component

### Class Component

- 生命周期函数 shouldComponentUpdate 返回一个布尔值:
  - true:
    - 当 props 或者 state 改变的时候进行更新;
  - false:
    - 不更新;
- 在普通的 Class Component 中:
  - 该生命周期函数默认返回 true;
    - 也就是当 props 或者 state 改变的时候:
      - 类组件及其子组件会进行更新;

### Pure Component

- 基于 '函数式编程范例' 中 '纯度' 的概念:
  - 如果符合以下两个条件:
    - 那么我们可以称一个组件是 Pure Component:
      - 其返回值 '仅' 由其输入值决定;
      - 对于相同的输入值，返回值始终相同;

---

- 如果 React 组件为:
  - 相同的 state 和 props 呈现相同的输出:
    - 则可以将其视为 '纯组件';
- 对于像这样的类组件:
  - React 提供了 PureComponent 基类;
    - 基于 React.PureComponent 类:
      - 实现的的 '类组件' 被视为 '纯组件';

---

- Pure Component 可以减少不必要的更新，进而提升性能:
  - 每次更新会自动帮你对更新前后的 props 和 state 进行一个简单对比:
    - 来决定是否进行更新(也就是自带了一个 shouldComponentUpdate);

---

- 接下来我们看看源码:
  - 在入口文件 React.js 中暴露了 Component 和 PureComponent 两个基类;
    - 它们来自于 packages/react/src/ReactBaseClasses.js:

---

- 首先是基本的 Component:

```js
/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  // 不同平台 updater 不一样
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  // 略
};

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
```

- 然后是 PureComponent:

```js
/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
```

- 可以看到 PureComponent 完全继承自 Component:
  - 只是在原型链上加了一个 isPureReactComponent;
    - 那么这个 isPureReactComponent 有什么用？
- 在调度更新的时候，这个属性会用来检查组件是否需要更新:

```js
// packages/react-reconciler/src/ReactFiberClassComponent.js

function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  const instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === "function") {
    startPhaseTimer(workInProgress, "shouldComponentUpdate");
    const shouldUpdate = instance.shouldComponentUpdate(
      newProps,
      newState,
      nextContext
    );
    stopPhaseTimer();

    return shouldUpdate;
  }

  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return (
      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    );
  }

  return true;
}
```
