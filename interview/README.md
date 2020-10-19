# 2020 前端 React 面试

## 性能优化

#### 性能优化，永远是面试的重点，性能优化对于 React 更加重要

- 在页面中使用了:
  - setTimout()、addEventListener()等;
    - 要及时在 componentWillUnmount()中销毁;
- 使用异步组件;
- 使用 React-loadable 动态加载组件;?
- shouldComponentUpdate(简称 SCU )、React.PureComponent、React.memo
- 不可变值 ImmutableJS;?

### shouldComponentUpdate()

```js
shouldComponentUpdate (nextProps, nextState) {
    return true // 可以渲染，执行 render()，默认返回 true
    return false // 不能渲染，不执行 render()
}
```

### 什么情况下需要使用 shouldComponentUpdate

- 在 React 中，默认情况下:
  - 如果父组件数据发生了更新;
    - 那么所有子组件都会'无条件更新' !!!!!
- 通过:
  - shouldComponentUpdate()retrun fasle
  - 来判断阻止 '当前遍历到的组件' 做无意义的更新;
- shouldComponentUpdate()并不是每次都需要使用:
  - 而是需要的时候才会优化;

```js
class App extends React.Component {
  constructor() {
    this.state = { list: [] };
  }
  render() {
    return (
      <div>
        {/* 当list数据发生变化时，Header组件也会更新，调用render() */}
        <Header />
        <List data={this.state.list} />
      </div>
    );
  }
}
```

- 在 shouldComponentUpdate()判断中:
  - 有一个有意思的问题:
    - 解释为什么 React setState() 要用不可变值;

```js
// 父组件
changeList(){
    this.state.list.push({ id: 2 })
    this.setState({
        list: this.state.list
    });
}

// 子组件中
import _ from 'lodash'
shouldComponentUpdate(nextProps, nextState){
    // 数组深度比较（一次性递归到底，耗费性能，工作中慎用）
    if(_.isEqual(nextProps.list, this.props.list)){
        return false;// 相等，不渲染
    }
    return true;// 不相等，渲染
}
```

---

- 子组件将始终不会渲染:
  - 因为在 shouldComponentUpdate()中:
    - this.state.list.push()已经修改了 this.props.list;
    - 而 this.setState()修改了 nextProps.list;
  - 所以两个值深度比较，将始终相同;

### PureComponent 和 memo

- 使用选择:
  - class 类组件中用 PureComponent;
  - 无状态组件(无状态)中用 memo;
- PureComponent, SCU 中实现了浅比较;(SCU: 存储控制器)
- 浅比较已使用大部分情况（尽量不要做深度比较）;

---

- PureComponent 与普通 Component 不同的地方在于:
  - PureComponent 自带了一个 shouldComponentUpdate();
    - 并且进行了浅比较;

#### memo用法

```js
// memo用法
function MyComponent (props) {
    /* 使用 props 渲染 */
}

// areEqual 也可不传
function areEqual(prevProps, nextProps) {
    if (prevProps.seconds===nextProps.seconds) {
        return true
    } else {
        return false
    }
}
export default React.memo(MyComponent, areEqual)
```
