# 项目笔记

## 理解函数式组件的运行过程

- 我们知道，Hooks 只能用于 React 函数式组件;

---

- 因此理解:
  - 函数式组件的'运行过程'对掌握:
    - Hooks 中许多'重要的特性'很关键,请看下图:
- ![运行过程](./src/static/img/render.gif "Magic Gardens")
- 可以看到，函数式组件严格遵循 UI = render(data) 的模式;
  - 当我们第一次调用组件函数时，触发初次渲染;
    - 然后随着 props 的改变，便会重新调用该组件函数，触发重渲染;

---

- 每一次渲染都是完全独立的;

## useState 在设计方面的精巧

- 状态和修改状态的 Setter 函数两两配对:
  - 并且后者一定影响前者;
  - 前者只被后者影响;
  - 作为一个整体它们完全不受外界的影响;
- 鼓励'细粒度'和'扁平化'的'状态定义'和'控制';
  - 对于'代码行为'的'可预测性'和'可测试性'大有帮助;
- 除了 useState （和其他钩子）:
  - 函数组件依然是实现'渲染逻辑'的 “纯” 组件;
    - 对'状态的管理'被 Hooks 所封装了起来;

## 深入 useEffect 的本质

- 注意其中一些细节:
  - useState 和 useEffect 在每次调用时都被:
    - 添加到 Hook 链表中;
  - useEffect 还会额外地在:
    - 一个队列中添加:
      - 一个等待执行的 Effect 函数;
  - 在渲染完成后:
    - 依次调用 Effect 队列中的:
      - 每一个 Effect 函数;

---

- React 官方文档 Rules of Hooks 中强调过一点:
  - Only call hooks at the top level. 只在最顶层使用 Hook;

---

- 具体地说，不要在循环、嵌套、条件语句中使用 Hook:
  - 因为这些'动态的语句'很有可能会导致:
    - 每次执行'组件函数'时'调用 Hook '的顺序不能完全一致;
      - 导致 Hook 链表记录的数据失效;

---

---

## 一个简单的自定义 Hook

- 先来看一个 Hook，名为 useBodyScrollPosition
  - 用于获取当前浏览器的垂直滚动位置:

```js
function useBodyScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}
```

- 通过观察，我们可以发现自定义 Hook 具有以下特点:
  - 表面上:
    - 一个命名格式为 useXXX 的函数;
    - 但不是 React 函数式组件;
  - 本质上:
    - 内部通过使用 React 自带的一些 Hook;
      - 例如 useState 和 useEffect:
        - 来实现某些通用的逻辑;

---

- 如果你发散一下思维，可以想到有很多地方可以去做自定义 Hook:
  - DOM 副作用修改 / 监听
  - 动画
  - 请求
  - 表单操作
  - 数据存储
  - 等等

---

- 这里推荐两个强大的 React Hooks 库:
  - React Use:
    - https://github.com/streamich/react-use
  - Umi Hooks:
    - https://github.com/alibaba/hooks

---

- 它们都实现了很多'生产级别'的自定义 Hook，非常值得学习;

### React Hooks 最大的魅力

- 通过几个内置的 Hook:
  - 你可以按照某些约定进行任意组合;
    - “制造出” 任何你真正需要的 Hook;
    - 或者调用他人写好的 Hook;
    - 从而轻松应对各种复杂的业务场景;
- 就好像大千世界无奇不有;
  - 却不过是由一百多种元素组合而成;

---

- 自定义 Hook 本质上只是把调用内置 Hook 的过程封装成一个个可以复用的函数，并不影响 Hook 链表的生成和读取。

## 关于记忆化缓存（Memoization）

- Memoization，一般称为记忆化缓存（或者 “记忆”）;
- 听上去是很高深的计算机专业术语，但是它背后的思想很简单:
  - 假如我们有一个计算量很大的纯函数:
    - 给定相同的输入，一定会得到相同的输出;
    - 那么我们在第一次遇到特定输入的时候:
      - 把它的输出结果 “记”（缓存）下来;
        - 那么下次碰到同样的输出;
          - 只需要从缓存里面拿出来直接返回就可以了;
            - 省去了计算的过程;

---

- 实际上，除了节省不必要的计算;
  - 从而提高程序性能之外;
- Memoization 还有一个用途:
  - 用于保证返回值的引用相等;

---

- 我们先通过一段简单的求平方根的函数;
  - 熟悉一下 Memoization 的原理;
  - 首先是一个没有缓存的版本：

```js
function sqrt(arg) {
  return { result: Math.sqrt(ary) };
}
```

- 你也许注意到了:
  - 我们特地返回了一个'对象来记录结果';
    - 我们后面会和 Memoized 的版本进行对比分析;

---

- 然后是加了缓存的版本:

```js
function memoizedSqrt(arg) {
  // 如果 cache 不存在，则初始化一个空对象
  if (!memoizedSqrt.cache) {
    memoizedSqrt.cache = {};
  }

  // 如果 cache 没有命中，则先计算，再存入 cache，然后返回结果
  if (!memoizedSqrt.cache[arg]) {
    return (memoizedSqrt.cache[ary] = { result: Math.sqrt(ary) });
  }

  // 直接返回 cache 内的结果，无需计算
  return memoizedSqrt.cache[arg];
}
```

- 然后我们尝试调用这两个函数，就会发现一些明显的区别:

```js
sqrt(9); // { result: 3 }
sqrt(9) === sqrt(9); // false
Object.is(sqrt(9), sqrt(9)); // false

memoizedSqrt(9); // { result: 3 }
memoizedSqrt(9) === memoizedSqrt(9); // true
Object.is(memoizedSqrt(9), memoizedSqrt(9)); // true
```

- 普通的 sqrt 每次返回的结果的引用都不相同:
  - 或者说是一个全新的对象;
- 而 memoizedSqrt 则能返回完全相同的对象;

---

- 此在 React 中:
  - 通过 Memoization 可以确保多次渲染中的 Prop 或者状态的引用相等;
    - 从而能够避免不必要的重渲染或者副作用执行;

---

- 让我们来总结一下记忆化缓存（Memoization）的两个使用场景:
  - 通过缓存计算结果，节省费时的计算;
  - 保证相同输入下返回值的引用相等;

### 使用方法和原理解析

- 为了解决函数在多次渲染中的引用相等（Referential Equality）问题;
  - React 引入了一个重要的 Hook—— useCallback;
- 官方文档介绍的使用方法如下：

```js
const memoizedCallback = useCallback(callback, deps);
```

- 第一个参数 callback 就是需要记忆的函数;
  - 第二个参数就是大家熟悉的 deps 参数;
    - 同样也是一个依赖数组（有时候也被称为输入 inputs）;
- 在 Memoization 的上下文中:
  - 这个 deps 的作用相当于缓存中的键（Key）;
    - 如果键没有改变，那么就直接返回缓存中的函数;
      - 并且确保是引用相同的函数;
- 在大多数情况下:
  - 我们都是传入空数组 [] 作为 deps 参数;
    - 这样 useCallback 返回的就始终是同一个函数，永远不会更新;

### useCallback 和 useMemo 的关系

- 我们知道 useCallback 有个好基友叫 useMemo;
  - 还记得我们之前总结了 Memoization 的两大场景吗？
    - useCallback 主要是为了解决函数的” 引用相等 “问题;
    - 而 useMemo 则是一个 "全能型选手":
      - 能够同时胜任'引用相等'和'节约计算'的任务。

---

- 实际上，useMemo 的功能是 useCallback 的超集:
  - 与 useCallback 只能缓存函数相比:
    - useMemo 可以缓存任何类型的值（当然也包括函数）;
      - useMemo 的使用方法如下:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 其中第一个参数是一个函数:
  - 这个函数返回值的返回值:
    - 也就是上面 computeExpensiveValue 的结果;
  - 将返回给 memoizedValue;
- 因此以下两个钩子的使用是完全等价的:

```js
useCallback(fn, deps);
useMemo(() => fn, deps);
```

- 鉴于在前端开发中遇到的;
  - 计算密集型任务是相当少的;
- 而且浏览器引擎的性能也足够优秀;
  - 因此这一系列文章不会深入去讲解 useMemo 的使用;
- 更何况，已经掌握 useCallback 的你;
  - 应该也已经知道怎么去使用 useMemo 了吧;

---

---

### 一个未解决的问题

- 你很有可能在使用 useState 的时候遇到过一个问题:
  - 通过 Setter 修改状态的时候，怎么读取上一个状态值，并在此基础上修改呢？
  - 如果你看文档足够细致，应该会注意到 useState 有一个函数式更新（Functional Update）的用法;
    - 以下面这段计数器（代码来自 React 官网）为例:

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
```

- 可以看到，我们传入 setCount 的是一个函数:
  - 它的参数是之前的状态，返回的是新的状态;

---

- 熟悉 Redux 的朋友马上就指出来了:
  - 这其实就是一个 Reducer 函数;

## Reducer 函数的前生今世

- Redux 文档里面已经详细地阐述了 Reducer 函数;
- 但是我们这里将先回归最基础的概念:
  - 暂时忘掉框架相关的知识;
- 在学习 JavaScript 基础时，你应该接触过数组的 reduce 方法:
  - 它可以用一种相当炫酷的方式实现'数组求和'：

```js
const nums = [1, 2, 3];
const value = nums.reduce((acc, next) => acc + next, 0);
```

- 其中 reduce 的第一个参数:
  - (acc, next) => acc + next 就是一个 Reducer 函数;
    - 从表面上来看，这个函数接受一个状态的累积值 acc 和新的值 next;
      - 然后返回更新过后的累积值 acc + next;
    - 从更深层次来说，Reducer 函数有两个必要规则:
      - 只返回一个值;
      - 不修改输入值，而是返回新的值;

---

- 第一点很好判断，其中第二点则是很多新手踩过的坑，对比以下两个函数:

```js
// 不是 Reducer 函数！
function buy(cart, thing) {
  cart.push(thing);
  return cart;
}

// 正宗的 Reducer 函数
function buy(cart, thing) {
  return cart.concat(thing);
}
```

- 上面的函数调用了数组的 push 方法:
  - 会'就地修改'输入的 cart 参数;
    - 违反了 Reducer 第二条规则;
- 下面的函数通过数组的 concat 方法返回了一个全新的数组;
  - 避免了直接修改 cart;

---

- 我们回过头来看之前 useState 的函数式更新写法:

```js
setCount((prevCount) => prevCount + 1);
```

- 是一个很标准的 Reducer;

### basicStateReducer

- 在 React 源码中有这么一个关键的函数 basicStateReducer（去掉了源码中的 Flow 类型定义）：

```js
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```

- 于是，当我们通过 setCount(prevCount => prevCount + 1) 改变状态时:
  - 传入的 action 就是一个 Reducer 函数:
    - 然后调用该函数并传入当前的 state;
      - 得到更新后的状态;
  - 传入具体的值修改状态时（例如 setCount(5)）:
    - 由于不是函数，所以直接取传入的值作为更新后的状态;

---

- 是不是一下子就豁然开朗了？
  - 反正我是;

---

## Redux 还有用吗：Control 与 Context 之争

- 听到有些声音说有了 React Hooks，都不需要 Redux 了。
  - 那 Redux 到底还有用吗？

---

- 在回答这个问题之前，请允许我先胡思乱想一波;
  - React Hooks 确实强大得可怕:
    - 特别是通过优秀的第三方自定义 Hooks 库:
      - 几乎能让每个组件都能游刃有余地处理复杂的业务逻辑;
  - 反观 Redux:
    - 它的核心思想就是将状态和修改状态的操作全部集中起来进行;

---

- 有没有发现，这其实刚好对应了两种管理学思想 Context 和 Control？

```
管理者需要 Context，not Control。—— 字节跳动创始人和 CEO 张一鸣
```

- Control 就是将权力集中起来:
  - 员工们只需有条不紊地按照 CEO 的决策执行相应的任务;
- 就像 Redux 中的全局 Store 是” 唯一的真相来源 “（Single Source of Truth）:
  - 所有状态和数据流的更新必须经过 Store;
- 而 Context 就是给予各部门、各层级足够的决策权:
  - 因为他们:
    - 所拥有的上下文更充足;
    - 专业度也更好;
  - 就像 React 中响应特定逻辑的组件具有更充足的上下文;
    - 并且可以借助 Hooks ” 自给自足 “地执行任务，而无需依赖全局的 Store;
