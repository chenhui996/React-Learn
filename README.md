# React 学习

- 学习 react 的一些:
  - 个人向学习笔记;
  - 小功能的实现;
- 持续迭代...

## setState

- setState(update, [callback])
  - updater: 更新数据 FUNCTION / OBJECT;
  - callback: 更新成功后的回调 FUNCTION;
  - 异步: react 通常会集齐一批需要更新的组件, 然后一次性更新来保证渲染的性能;
  - 浅合并: Object.assign();
  - 调用 setState 之后, 会触发生命周期, 重新渲染组件;

## 组件的生命周期

- 所谓的生命周期就是:
  - 指某个'事物'从'开始'到'结束'的'各个阶段';
- 当然在 React.js 中指的是:
  - '组件'从'创建'到'销毁'的过程;
- React.js 在这个过程中的:
  - 不同阶段:
    - 调用的不同函数;

---

- 通过这些函数（生命周期函数）:
  - 我们可以更加:
    - 精确的对组件进行控制;

---

- 前面我们一直在使用的:
  - render 函数:
    - 其实就是:
      - 组件生命周期'渲染阶段'执行的函数;

## 生命周期的演变

- 挂载阶段
- 更新阶段
- 卸载阶段

### 挂载阶段

- 挂载阶段:
  - 组件创建 -> 把组件创建的虚拟 DOM,生成真实 DOM,添加到我们的 DOM 树中
    - constructor
    - static getDerivedStateFromProps(props)
      - 注意 this 问题;
    - render
    - componentDidMount -- 处理副作用(请求)

### 更新阶段

- 更新阶段:
  - 组件重新渲染:
    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate() -- 判断是否更新
    - render()
    - getSnapshotBeforeUpdate()
    - componentDidUpdate() -- 处理副作用(请求)

### 卸载阶段

- 卸载阶段:
  - 组件卸载:
    - componentWillUnmount -- 删除添加在全局的一些信息或操作（内存回收等）

### 深入 - 挂载阶段(mount)

#### 第一步

- constructor:

```js
class App extents Componet{
  constructor(props){
    super(props);
    // 0, 初始化组件
  }
}
```

#### 第二步

- getDerivedStateFromProps():

```js
class App extents Componet{
  // ...

  // 将 props 中的某些数据,关联到状态中
  static getDerivedStateFromProps(props){
    // 将对应的数据添加到state中
    // 1, 将Props关联至state
    return {
      name: props.name
    }
  }

}
```

#### 第三步

- render():

```js
render(){
  // 2, 调用render根据render的返回值,生成虚拟DOM
}
```

#### 第四步

- componentDidMount():

```js
class App extents Componet{
  // ...

  // 组件挂载完成,如果要获取真实DOM,在该方法中获取
  componentDidMount(){
    // 3, 组件挂载完成
  }
}
```

### 深入 - 更新阶段(update)

#### 第一步

- getDerivedStateFromProps():

```js
class App extents Componet{
  static getDerivedStateFromProps(props){
    // 将对应的数据添加到state中
    // 0, 观察Props的变化, 重新将Props绑定至state
    return {
      name: props.name
    }
  }

}
```

#### 第二步

- shouldComponentUpdate()

```js
class App extents Componet{
  // ...

  // 1, 控制(判断)是否要更新组件
  shouldComponentUpdate(nextProps, nextState){
    // nextProps 更新之后的Props
    // nextState 更新之后的State
    console.log(this.props, this.state, nextProps, nextSate);

    return true;
    // true 继续更新流程, 进行组件更新
    // false 打断更新流程, 不再继续更新
  }
}
```

#### 第三步

- render():

```js
render(){
  // 2, 调用render根据render的返回值,生成'新的'虚拟DOM
}
```

#### 第四步

- getSnapshotBeforeUpdate():

```js
class App extents Componet{
  // ...

  getSnapshotBeforeUpdate(prveProps, prveState){
    // 3, 获取更新前的DOM快照
  }
}
```

#### 第五步

- componentDidUpdate():

```js
class App extents Componet{
  // ...

  componentDidUpdate(prveProps, prveState, prveDOM){
    // 4, 组件更新完成
  }
}
```

### 深入 - 卸载阶段(Unmount)

#### 第一步

- componentWillUnmount:

```js
class App extents Componet{
  componentWillUnmount(){
    // 0, 组件即将卸载

    // 在这里回收一些事件和对象(垃圾回收)
  }
}
```

- 由于组件卸载完成后,就没了,故'卸载组件'无下一步了;

### PrueComponent

- PrueComponent 和 Component:
  - 功能完全一致;
  - 只是在组件更新时:
    - PrueComponent 会对 props/state 做一个'浅对比':
      - 如果为 true ,则不渲染组件;
- 使用 PrueComponent 要记住:
  - 如果修改的数据是'引用类型':
    - 一定返回一个新的引用;
- 可以理解成:
  - PrueComponent 自带了一个:
    - shouldComponentUpdate();
