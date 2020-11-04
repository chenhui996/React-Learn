# React 高阶组件介绍

## 高阶组件的定义

- HoC:
  - High order Component
- HoC 不属于 React 的 API:
  - 它是一种实现模式;
    - 本质上是一个 '函数':
      - 接受 '一个' 或 '多个' React 组件作为 '参数';
        - 返回一个全新的 React 组件;
          - 而不是改造现有的组件;
            - 这样的组件被称为 '高阶组件';
- 开发过程中:
  - 有的功能需要在:
    - 多个组件类复用时:
      - 这时可以创建一个 Hoc;

## 基本用法

- 包裹方式:

```js
const HoC = (WrappendComponent) => {
  const WrappendComponent = (props) => {
    <div className="container">
      <WrappingComponent {...props} />
    </div>;
  };
  return WrappingComponent;
};
```

- 上述代码中:
  - 接受 WrappendComponent 作为参数:
    - 此 '参数' 就是将要 '被 HoC 包装' 的 '普通组件':
      - 在 render 中包裹一个 div:
        - 赋予它 className 属性;
          - 最终产生的 WrappingComponent 和:
            - 传入的 WrappendComponent 是两个完全不同的组件;

---

- 在 WrappingComponent 中:
  - 可以:
    - 读取、添加、编辑、删除
    - 传给 WrappendComponent 的 props;
  - 也可以:
    - 用其它 '元素' 包裹 WrappendComponent:
      - 用来实现:
        - 封装样式
        - 添加布局
        - 或其它操作;

---

- 组合方式:

```js
const Hoc = (WrappendComponent, LoginView) => {
  Ï;
  const WrappingComponent = () => {
    const { user } = this.props;
    if (user) {
      return <WrappendComponent {...this.props} />;
    } else {
      return <LoginView {...this.props} />;
    }
  };
  return WrappingComponent;
};
```

- 上述代码中有两个组件:
  - WrappedComponent
  - LoginView
- 如果传入的 props 中存在 user:
  - 则正常显示的 WrappedComponent 组件;
    - 否则显示 LoginView 组件，让用户去登录;
- HoC 传递的参数可以为多个:
  - 传递多个组件:
    - 定制新组件的行为;
      - 例如用户登录状态下显示主页面;
        - 未登录显示登录界面;
      - 在渲染列表时:
        - 传入 List 和 Loading 组件:
          - 为新组件添加 '加载中' 的行为;

---

- 继承方式:

```js
const HoC = (WrappendComponent) => {
  class WrappingComponent extends WrappendComponent {
    render() {
      const { user, ...otherProps } = this.props;
      this.props = otherProps;
      return super.render();
    }
  }
  return WrappingComponent;
};
```

- WrappingComponent 是一个新组件:
  - 它继承自 WrappendComponent:
    - 共享父级的 '函数' 和 '属性';
      - 可以使用 super.render() 或者 super.componentWillUpdate():
        - 调用父级的生命周期函数;
          - 但是这样会让两个组件耦合在一起，降低组件的复用性;

---

- React 中对组件的封装:
  - 是按照最小可用单元的思想来进行封装的;
- 理想情况下:
  - 一个组件只做一件事情;
    - 符合 OOP 中的单一职责原则;
- 如果需要对组件的功能增强:
  - 通过组合的方式;
  - 或者添加代码的方式;
  - 对组件进行增强:
    - 而不是修改原有的代码;

## 注意事项

- 不要在 render 函数中使用高阶组件

```js
render() {
  // 每一次render函数调用都会创建一个新的EnhancedComponent实例
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 每一次都会使子对象树完全被卸载或移除
  return <EnhancedComponent />;
}
```

- React 中的 diff 算法会比较新旧子对象树:
  - 确定 '是否更新现有的子对象树' 或 '丢掉现有的子树' 并 '重新挂载';

---

- 必须将静态方法做拷贝

```JS
// 定义静态方法
WrappedComponent.staticMethod = function() {/*...*/}
// 使用高阶组件
const EnhancedComponent = enhance(WrappedComponent);

// 增强型组件没有静态方法
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

---

- Refs 属性不能传递:
  - HoC 中指定的 ref:
    - 并不会传递到子组件;
      - 需要通过回调函数使用 props 传递;
