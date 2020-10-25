# redux

- redux 是一个独立的:
  - Javascript 状态管理库;
    - 提供可预测的状态管理;
  - 唯一不属于 facebook 官方出品的东西;
    - facebook 的状态管理库:
      - 正在筹备中, 什么时候发布还不好说;
- 官方文档:
  - https://www.redux.org.cn/
- 安装:

```
npm i redux
yarn add redux
```

## 掌握需求:

- redux 三大原则
- redux 基础使用
- react-redux 使用
- redux-thunk 使用

### createStore

- store(仓库, 容器):
  - 管理状态;
  - 其中有一些核心方法:
    - getState:
      - 获取 state;
    - dispatch:
      - 修改 state;
      - action:
        - 要对 state 做'怎样的'修改;
        - action 本质是一个对象;
        - action 对象有一个'必写参数':
          - type:
            - 描述了该 action 要做怎样操作;
      - dispatch 是同步方法;

```js
const store = createStore(reducer);
```

- 然后基于 reducer 给我们创建一个 store;

#### reducer:

- reducer(依赖参数):
  - 纯函数;
    - 提供状态管理(操纵状态的各种方式);

```js
function reducer(state = { data: [] }, action) {
  return state;
}
```

##### reducer 这个纯函数

- reducer 这个纯函数:
  - 在该函数中:
    - 没有任何副作用(副作用: dom 操作、任何异步操作);
    - reducer 很简单:
      - 接收 action
      - 返回'新的 state';
      - 无任何副作用, 非常纯粹;
  - 该函数不依赖外部数据 - 低内聚
    - 也就是'不依赖外部环境状态';
  - 相同的输入:
    - 永远返回:
      - 相同的输出;
  - 不修改函数的输入值
    - 也就是 state:
      - switch 每次都返回一个新的 state;

### dispatch 整体流程

- 调用 dispatch 时:
  - store 会调用 reducer 函数:
    - 并将 state 和 dispatch 传入的 action:
      - 传递给 reducer;

```js
const store = createStore(reducer);
store.dispatch({
  type: "ADD", // 行规，最好大写
});
```

- 在 reducer 中:
  - 监听 action.type 的不同(用 switch 监听):
    - 来返回新的 state;

### subscribe

- 监听 state 发生改变
  - 否则直接在 react 视图中改 store 后:
    - 无法更新视图(数据没变):
      - 因为拿不到更新后的 store 数据;
- 其接收一个函数, 当 state 改变时, 调用该函数;

```js
// subscribe 参数为一个函数
store.subscribe(() => {
  render();
});
```

- 除此之外, subscribe 还返回一个函数:
  - 该函数用于'取消监听';

```js
const useSubscribe = store.subscribe(() => {
  // 拿到更新后的数据, 再次调用render渲染视图
  render();
});

// 取消监听
useSubscribe();
```

## redux 三大原则

- 单一数据源:
  - 整个应用的 state 被储存在'一棵 object tree'中;
    - 并且这个 object tree 只存在于唯一一个 store 中;
- State 是只读的:
  - 唯一改变 state 的方法就是触发 action:
    - action 是一个:
      - 用于描述'已发生事件'的'普遍对象';
- 使用纯函数来:
  - 执行修改;

---

# react-redux

- react 项目中的 redux 绑定库;
- 安装:
  - npm i react-redux
- 而且不需要我们去手写监控:
  - react-redux 帮助我们自动监控;

### Provider

- 向自己子孙级传递信息;
- 故使用 Provider 组件:
  - 放在应用的'最外层';

```js
ReactDom.render(
  <Provider>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```

- 在 Provider 中:
  - 有一个 store 属性:
    - store 属性中, 传入的是:
      - redux 的 store;

```js
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```

## 如何在组件中获取 redux 的 store

- 两个方法:
  - hooks:
    - react-redux 提供的 hooks (版本 7 之后才有的 hooks);
      - 三个 hooks:
        - useDispatch:
          - 获取 dispatch
        - useStore:
          - 获取 store
        - useSelector:
          - 获取 state
  - connect(高阶组件):
    - 传入一个函数, 返回一个新的函数;
    - 拿到 store 中所有的 state;
    - 将组件需要的 state、dispatch:
      - 传给组件;
    - 语法:
      - connect(callback)(App)
        - callback:
          - 获取返回的 state;
          - '返回值'必须有一个对象类型的;
            - 该函数的'返回值'决定了:
              - 那些函数需要传递给:
                - 组件;
        - App:
          - 需要挂载的组件;
