# react 函数式组件

- 就是个普通函数:
  - 每个函数 - 代表一个'组件';

### return

- renturn 来返回我们要构建的视图(JSX 编写);

## 在 react16.7 之前:

- 函数式组件没有'state', 也没有生命周期, 被称为'无状态组件';
  - 只能充当最基本的纯渲染组件;

## React hooks(钩子):

- React hooks 是 React16.8 中的新增功能;
  - 它们使您无需编写'类';
  - 即可使用'状态'和'其他 React 功能';

### 常用 hooks(钩子函数)

#### useState(initValue)

- 状态:
  - 使我们的'函数式组件'拥有'状态';
- 使用:

```js
import React, { useState } from "react";

function Child() {
  let [count, setCount] = useState(1);
  let [name, setName] = useState("cain");
  return (
    <div>
      <input
        type="test"
        value={name}
        onChange={({ target }) => {
          setName(target.value);
        }}
      />
      <p>{name}</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
    </div>
  );
}

export default Child;
```

#### useEffect(副作用 hook)

- 模型:

```js
useEffect(() => {
  // 副作用函数;
  return () => {
    // 副作用函数的返还函数
  };
}, [depend]); // depend: 依赖参数
```

- 使用场景:
  - 组件挂载完成之后，或更新之后要做的操作;
- 分割各个生命周期:

```js
function Child() {
  // ...

  const update = useRef(false);

  useEffect(() => {
    console.log("componentDidMount");
    return () => {
      console.log("componentWillUnMount");
    };
  }, []);
  useEffect(() => {
    if (update.current) {
      console.log("componentDidUpdate");
    } else {
      update.current = true;
    }
  });

  // ...
}
```
