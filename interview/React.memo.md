# react 组件优化之 React.memo

### 故事的开始：

- 作者的上一个项目尝试使用了 react16.0 进行开发，并全线使用 hooks-api;
  - 开发时由于没有注意'react 组件渲染机制';
    - 导致项目的性能大大低于预期;
  - 开发一时爽，完成后才发现对于 react 的 hooks 只是机械性的使用，未能得其精髓;
  - 在又一次的 react16.0 的学习中:
    - 看到了对于 React.memo 这个方法:
      - 知道了这个 API 是对组件渲染优化至关重要的点;

### 情景再现：

- 请看以下代码

```js
//react
const Child = (props) => {
  console.log("child update");
  return <div>{props.text}</div>;
};

const App = () => {
  const [text, setText] = useState("我是文本");
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Child text={text} />
    </div>
  );
};
```

- 为什么我每点击一次按钮，控制台就回打印出'child update'?
  - 当页面初始化完成之后，在手动点击 button 按钮时，请问控制台输出什么？
    - 答案是：每当我点击一次 button，count 更改后，控制台会打印出 'child update';
  - 意味着 child 组件重新渲染了:
    - 那么为什么 count 的变动会影响 child 组件?
      - 如果是 vue 用户，可能不会有这样的疑惑;
        - 因为在 vue 下，这种情况必不可能发生，例如:

```js
//child
<template>
    <div>{{text}}</div>
</template>

export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    mounted() {
        console.log('child mounted')
    },
    updated() {
        console.log('child update')
    }
}

// parent
<template>
    <div>
        <button @click='countAdd'>
            {{count}}
        </button>
        <Child :text='text' />
    </div>
</template>

export default {
    data() {
        return {
            count: 0,
            text: 'child'
        }
    },
    methods: {
        countAdd() {
            this.count ++;
        }
    }
    mounted() {
        console.log('child mounted')
    },
    updated() {
        console.log('child update')
    }
}
```

- 对于 vue 来说，这很好解释:
  - child 依赖 parent 传入的 text;
    - parent 内 count 的变更，而 text 没有变动，所以 child 组件无需更新;
- 那么问题回到最初:
  - 在 react 内父组件的 state 变更:
    - 没有依赖变更数据的子组件为什么会重新渲染;

## 数据的单向流动

- 对于 vue 来说，因为使用的是:
  - 数据劫持的方式;
  - 所以可以很方便的知道哪里的数据进行了更新:
    - 因为知道'数据改变'的'具体位置'，那么'组件的重新渲染'是'可控的';
  - 即在'框架内部'，'vue 自己'就已经'优化'了'组件渲染的时机':
    - 防止'单一数据变动'而'引起的大规模的组件渲染'，造成'不必要的性能浪费';
- 但是 React 是单向数据流:
  - 数据主要从父节点传递到子节点（通过 props）;
- 如果顶层（父级）的某个 props 改变了:
  - React 会重渲染所有的子节点;
    - 但是这样就会造成比较多的性能浪费;
      - 在 react 16 以下 class 组件中:
        - 我们可以使用 shouldComponentDidMount 或者 PureComponent 来控制组件的渲染;
      - 但是在 16.0 以上函数式组件中:
        - 我们应该如何去优化组件渲染呢?
          - 标题来了：React.memo;

### React.memo

- 该 api 使得组件'仅在它的 props 发生改变的时候'进行'重新渲染';
- 通常来说:
  - 在组件树中 React 组件:
    - 只要有变化就会走一遍'渲染流程';
- 但是通过 React.memo():
  - 我们可以仅仅让某些组件进行渲染;

---

- 所以对于上面重复渲染子组件的方案，仅仅需要小小改造一下就行:

```js
//react
import { memo } from "react";

const Child = memo((props) => {
  console.log("child update");
  return <div>{props.text}</div>;
});
```

- 改造完成:
  - 多次点击 button 控制台已经不会再像之前一样多次打印'child update'了;
    - 此本次 react 组件优化结束了;

## 小结

- 其实就是在:

  - 组件对象外用 memo()包住;
    - 即实现'避免由父组件数据改变引起的无关子组件不必要渲染';

- 作者：甜不辣不甜
- 链接：https://juejin.im/post/6883403233310539790
- 来源：掘金
- 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
