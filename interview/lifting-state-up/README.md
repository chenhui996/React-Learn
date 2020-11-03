# React 状态提升

## 引言

- 很多情况下:
  - 我们使用的 '多个组件':
    - 需要对:
      - 同一个 '数据':
        - 做出对应的 '反应';
- 在这里我们推荐:
  - 把这个 '共享的状态':
    - 提升到:
      - 距离这些组件:
        - 最近的 '祖先组件';
- 现在让我们来看看这是怎么工作的;

---

- 在本章中:
  - 我们将会创建一个:
    - 温度计算器:
      - 来计算在给定温度下:
        - 水是否会沸腾;

```js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

- 接下来:
  - 我们将会创建一个 Calculator 组件:
    - 它渲染了:
      - 一个输入框:
        - 输入温度
        - 将输入值绑定到 this.state.temperature
- 除此之外:
  - 它也为:
    - 当前输入的温度:
      - 渲染相应的 BoilingVerdict;

```js
class Calculator extends React.Componet {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: "",
    };
  }

  handleChange(e) {
    this.setState({
      temperature: e.target.value,
    });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

- 然后将 Calculator 挂载到 App 组件上;
  - 至此，基本功能完成:
    - 能判断输入的温度，并且返回响应逻辑;
      - 但是，本文我们要 '解决' 和 '了解' 的问题是:
        - 状态提升
          - 所以，我们还需往下看;

### 添加第二个输入框

- 现在我们有一个新需求:
