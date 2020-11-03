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
  - 除了输入摄氏温度之外;
  - 我们还需要一个:
    - 能够输入 '华氏温度' 的输入框:
      - 且这两个输入框是同步的;

---

- 首先我们可以从:
  - Calculator 组件中:
    - 提取出一个:
      - TemperatureInput 组件;
    - 并添加一个 scale:
      - 作为 prop 来代表:
        - 摄氏度（c）或华氏温度（f）

```js
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

- 现在:
  - 我们可以更改:
    - Calculator 组件:
      - 渲染两个不同的温度输入;

```js
class Calculator extends React.Component {
    render(){
        return (
            <TemperatureInput scale="c" />
            <TemperatureInput scale="f" />
        )
    }
}
```

- 我们现在有了两个输入框;
  - 但当你在其中一个输入温度时:
    - 另一个并不会更新;
  - 这与我们的要求相矛盾:
    - 我们希望让它们保持同步;
- 另外:
  - 我们也不能:
    - 通过 Calculator 组件:
      - 展示 BoilingVerdict 组件的 '渲染结果';
        - 因为:
          - Calculator 组件并不知道:
            - 隐藏在 TemperatureInput 组件中的当前温度是多少;

### 编写转换函数

- 首先:
  - 我们将编写:
    - 两个;
      - 可以在 '摄氏度' 与 '华氏度' 之间:
        - 相互转换的函数:

```js
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
```

- 上述两个函数:
  - 仅做数值转换;
- 而我们将编写另一个函数:
  - 它接受:
    - 字符串类型的 temperature
    - 转换函数
  - 作为参数:
    - 并返回一个字符串;
      - 我们将使用它:
        - 来依据 '一个输入框的值':
          - 计算出 '另一个输入框的值';

---

- 当输入 temperature 的值无效时:
  - 函数返回空字符串;
- 反之:
  - 则返回 '保留三位小数' 并 '四舍五入后' 的 '转换结果':

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

- 例如：
  - tryConvert('abc', toCelsius):
    - 返回一个空字符串;
  - 而 tryConvert('10.22', toFahrenheit):
    - 返回 '50.396';

---

### 状态提升

- 到目前为止:
  - 两个 TemperatureInput 组件:
    - 均在各自内部的 state 中:
      - 相互独立地保存着各自的数据;

```js
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

- 然而，我们希望:
  - 两个输入框内的数值:
    - 彼此能够同步;
  - 当我们更新 '摄氏度输入框' 内的数值时:
    - 华氏度输入框内:
      - 应当显示:
        - 转换后的华氏温度;
          - 反之亦然;

---

- 在 React 中:
  - 将多个组件中:
    - 需要共享的 state 向上移动:
      - 到它们的最近 '共同父组件' 中:
        - 便可实现共享 state;

---

- 这就是所谓的 "状态提升";

---

- 接下来:
  - 我们将 TemperatureInput 组件:
    - 中的 state :
      - 移动至:
        - Calculator 组件中去;

---

- 如果 Calculator 组件:
  - 拥有了共享的 state;
    - 它将成为:
      - 两个温度输入框中:
        - 当前温度的“数据源”;
          - 它能够使得:
            - 两个温度输入框的数值:
              - 彼此保持一致;
          - 由于两个 TemperatureInput 组件的 props:
            - 均来自共同的父组件 Calculator:
              - 因此 '两个输入框中的内容' 将始终保持一致;
- 让我们看看这是如何一步一步实现的;

---

- 首先:
  - 我们将 TemperatureInput 组件中的:
    - this.state.temperature 替换为 this.props.temperature;
- 现在:
  - 我们先假定 this.props.temperature 已经存在:
    - 尽管将来:
      - 我们需要通过 Calculator 组件将其传入:

```js
render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

- 我们知道 props 是只读的;
  - 当 temperature 存在于 TemperatureInput 组件的 state 中时:
    - 组件调用 this.setState() 便可修改它;
  - 然而:
    - temperature 是由父组件传入的 prop:
      - TemperatureInput 组件便失去了对它的控制权;

---

- 在 React 中:
  - 这个问题通常是通过使用“受控组件”来解决的:
    - 与 DOM 中的 <input> 接受 value 和 onChange 一样:
      - 自定义的 TemperatureInput 组件:
        - 接受 temperature 和 onTemperatureChange 这两个:
          - 来自父组件 Calculator 的 props;

---

- 现在:
  - 当 TemperatureInput 组件想更新温度时:
    - 需调用 this.props.onTemperatureChange 来更新它:

```js
handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

#### 注意：

- 自定义组件中的 temperature 和 onTemperatureChange:
  - 这两个 prop 的命名没有任何特殊含义;
- 我们可以给它们取其它任意的名字:
  - 例如，把它们命名为 value 和 onChange 就是一种习惯;

---

- onTemperatureChange 的 prop 和 temperature 的 prop 一样:
  - 均由父组件 Calculator 提供;
- 它通过:
  - 修改父组件自身的内部 state 来处理数据的变化;
    - 进而使用新的数值:
      - 重新渲染两个输入框;
- 我们将很快看到修改后的 Calculator 组件效果;

---

- 在深入研究 Calculator 组件的变化之前:
  - 让我们回顾一下 TemperatureInput 组件的变化;
    - 我们移除组件自身的 state:
      - 通过使用 this.props.temperature 替代 this.state.temperature :
        - 来读取温度数据;
    - 当我们想要响应数据改变时:
      - 我们需要调用 Calculator 组件提供的 this.props.onTemperatureChange():
        - 而不再使用 this.setState();

```js
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

- 现在，让我们把目光转向 Calculator 组件;
- 我们会把:
  - 当前输入的 temperature 和 scale
    - 保存在组件内部的 state 中;
  - 这个 state 就是从 '两个输入框组件' 中“提升”而来的;
    - 并且它将用作两个输入框组件的共同“数据源”;
      - 这是我们为了:
        - 渲染两个输入框所需要的:
          - 所有数据的最小表示;

---

- 例如:
  - 当我们在摄氏度输入框中键入 37 时:
    - Calculator 组件中的 state 将会是:

```js
{
  temperature: "37",
  scale: "c"
}
```

- 如果我们之后:
  - 修改华氏度的输入框中的内容为 212 时:
    - Calculator 组件中的 state 将会是:

```js
{
  temperature: "212",
  scale: "f"
}
```

- 我们可以存储两个输入框中的值:
  - 但这并不是必要的;
- 我们只需要存储:
  - 最近 '修改的温度' 及其 '计量单位' 即可:
    - 根据当前的 temperature 和 scale :
      - 就可以计算出 '另一个输入框的值';
- 由于两个输入框中的数值由同一个 state 计算而来:
  - 因此它们始终保持同步:

```js
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: "",
      scale: "c",
    };
  }

  handleCelsiusChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: "c",
    });
  }
  handleFahrenheitChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: "f",
    });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

- 现在无论你编辑哪个输入框中的内容:
  - Calculator 组件中的:
    - this.state.temperature 和 this.state.scale 均会被更新;
  - 其中一个输入框:
    - 保留用户的输入并取值;
  - 另一个输入框:
    - 始终基于这个值:
      - 显示转换后的结果;

---

- 让我们来重新梳理一下 '当你对输入框内容进行编辑时' 会发生些什么:
  - React 会调用 DOM 中 <input> 的 onChange 方法:
    - 在本实例中，它是 TemperatureInput 组件的 handleChange 方法;
  - TemperatureInput 组件中的 handleChange 方法会调用 this.props.onTemperatureChange():
    - 并传入新输入的值作为参数;
    - 其 props 诸如 onTemperatureChange 之类，均由父组件 Calculator 提供;
  - 起初渲染时:
    - 用于摄氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法:
      - 与 Calculator 组件中的 handleCelsiusChange 方法相同;
    - 而，用于华氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法:
      - 与 Calculator 组件中的 handleFahrenheitChange 方法相同;
    - 因此，无论哪个输入框被编辑都会调用 Calculator 组件中对应的方法;
  - 在这些方法内部:
    - Calculator 组件通过使用:
      - 新的输入值与:
        - 当前输入框对应的温度计量单位:
          - 来调用 this.setState() 进而请求 React 重新渲染自己本身;
  - React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现;
    - 温度转换在这时进行:
      - 两个输入框中的数值通过 '当前输入温度' 和其 '计量单位' 来 '重新计算' 获得;
  - React 使用 Calculator 组件:
    - 提供的新 props:
      - 分别调用两个 TemperatureInput 子组件的 render 方法:
        - 来获取子组件的 UI 呈现;
  - React 调用 BoilingVerdict 组件的 render 方法:
    - 并将摄氏温度值以组件 props 方式传入;
  - React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM;
    - 我们刚刚编辑的输入框接收其当前值:
      - 另一个输入框内容更新为转换后的温度值;
- 得益于每次的更新都经历相同的步骤:
  - 得益于每次的更新都经历相同的步骤;

## 学习小结

- 在 React 应用中 z:
  - 任何可变数据应当只有一个相对应的唯一“数据源”;
- 通常，state 都是首先添加到需要渲染数据的组件中去:
  - 然后，如果其他组件也需要这个 state:
    - 那么你可以将它提升至这些组件的最近共同父组件中;
- 你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state;

---

- 虽然提升 state 方式比 '双向绑定方式' 需要编写更多的“样板”代码:
  - 但带来的好处是:
    - 排查和隔离 bug 所需的工作量将会变少;
      - 由于“存在”于组件中的任何 state;
        - 仅有组件自己能够修改它:
          - 因此 bug 的排查范围被大大缩减了;
    - 此外，你也可以使用 '自定义逻辑' 来拒绝或转换用户的输入;

---

- 如果某些数据:
  - 可以由 props 或 state 推导得出;
    - 那么它就不应该存在于 state 中;
- 举个例子:
  - 本例中我们没有将 celsiusValue 和 fahrenheitValue 一起保存;
    - 是仅保存了最后修改的 temperature 和它的 scale;
  - 这是因为另一个输入框的温度值:
    - 始终可以通过这两个值以及组件的 render() 方法获得;
  - 这使得我们能够清除输入框内容;
  - 亦或是，在不损失用户操作的输入框内数值精度的前提下:
    - 对另一个输入框内的转换数值做四舍五入的操作;

---

- 当你在 UI 中发现错误时:
  - 可以使用 React 开发者工具 来检查问题组件的 props:
    - 并且按照组件树结构逐级向上搜寻:
      - 直到定位到负责更新 state 的那个组件;
  - 这使得你能够追踪到产生 bug 的源头;
