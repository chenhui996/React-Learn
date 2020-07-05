# React 学习笔记

我们将使用 React 脚手架 – Create React App（简称 CRA）来初始化项目;
同时这也是官方推荐初始化 React 项目的最佳方式;

- 在终端中输入如下命令：
  - npx create-react-app my-todolist
- 等待命令运行完成，接着输入如下命令开启项目：
  - cd my-todolist && npm start

CRA 会自动开启项目并打开浏览器，可看到项目已经起起来了。(CRA:create react app)

现在 CRA 初始化的项目里有很多无关的内容，为了开始接下来的学习，我们还需要做一点清理工作。

- 首先在终端中按 ctrl + c 关闭刚刚运行的开发环境，然后在终端中依次输入如下的命令：

# 进入 src 目录

cd src

# 如果你在使用 Mac 或者 Linux：

rm -f \*

# 然后，创建我们将学习用的 JS 文件

touch index.js

# 最后，切回到项目目录文件夹下

cd ..

此时如果在终端项目目录下运行 npm start 会报错，因为我们的 index.js 还没有内容.

使用编辑器打开项目，在刚刚创建的 index.js 文件中加入如下代码：

<script>
    import React from "react";
    import ReactDOM from "react-dom";

    class App extends React.Component {
        render() {
            return <div>Hello, World</div>;
        }
    }
    ReactDOM.render(<App />, document.getElementById("root"));
</script>

- 我们看到 index.js 里面的代码分为三个部分。
  - 首先是一系列导包，我们导入了 react 包，并命名为 React，导入了 react-dom 包并命名为 ReactDOM;
  - 然后我们定义了一个 React 组件，命名为 App，继承自 React.Component;
  - 接着我们使用 ReactDOM 的 render 方法来渲染刚刚定义的 App 组件;
    - render 方法接收两个参数:
      - 第一个参数为我们的 React 根级组件;
      - 第二个参数接收一个 DOM 节点;
    - 我们将把和 React 应用挂载到这个 DOM 节点下，进而渲染到浏览器中。

保存代码，在终端中使用 npm start 命令开启开发服务器,即可看到 helloWorld 画面;

# JSX 语法

- 首先我们来看一下 React 引以为傲的特性之一 – JSX。

  - 它允许我们在 JS 代码中使用 XML 语法来编写用户界面,使得我们可以充分的利用 JS 的强大特性来操作用户界面;

- 一个 React 组件的 render 方法中 return 的内容就为这个组件所将渲染的内容。

  - 比如我们现在的代码：
    render() {
    return <div>Hello, World</div>;
    }
  - 这里的 <div>Hello, World</div> 是一段 JSX 代码;
  - 它最终会被转译成下面这段 JS 代码:
  <script>
      React.createElement(
          'div',
          null,
          'Hello, World'
      );
  </script>
  - React.createElement() 接收三个参数：
    - 第一个参数代表 JSX 元素标签;
    - 第二个参数代表这个 JSX 元素接收的属性，它是一个对象，这里因为我们的 div 没有接收任何属性，所以它是 null;
    - 第三个参数代表 JSX 元素包裹的内容;
  - React.createElement() 会对参数做一些检查确保你写的代码不会产生 BUG;

        - 它最终会创建一个类似下面的对象：

    <script>
        {
            type: 'div',
            props: {
                children: 'Hello, World'
            }
        };
    </script>

        - 这些对象被称之为 “React Element”;
        - 你可以认为它们描述了你想要在屏幕上看到的内容;
        - React 将会接收这些对象，使用它们来构建 DOM，并且对它们进行更新;
        - App 组件最终返回这段 JSX 代码，所以我们使用 ReactDOM 的 render 方法渲染 App 组件，最终显示在屏幕上的就是 Hello, World" 内容。

# JSX 作为变量使用

因为 JSX 最终会被编译成一个 JS 对象，所以我们可以把它当做一个 JS 对象使用，它享有和一个 JS 对象同等的地位，比如可以将其赋值给一个变量;

- 我们修改上面代码中的 render 方法如下：
<script>
    render(){
        const element = <div>Hello,World</div>
        return element;
    }
</script>
- 保存代码，我们发现浏览器中渲染的内容和我们之前类似。

# 在 JSX 中使用变量

我们可以使用大括号 {} 在 JSX 中动态的插入变量值;

- 修改 render 方法如下：
<script>
    class App extends React.Component {
        render() {
            const content = "World";
            const element = <div>Hello, {content}</div>;
            return element;
        };
    };
</script>
- 保存代码，发现浏览器中效果依然不变。

# JSX 中使用 JSX

我们可以在 JSX 中再包含 JSX，这样我们编写任意层次的 HTML 结构：

<script>
    class App extends React.Component {
        render() {
            const element = <li>Hello, World</li>
            return (
            <div>
                <ul>
                    {element}
                </ul>
            </div>
            )
        };
    };
</script>

# JSX 中添加节点属性

我们可以像在 HTML 中一样，给元素标签加上属性:

- 只不过我们需要'遵守驼峰式命名'法则:
  - 比如在 HTML 上的属性 data-index 在 JSX 节点上要写成 dataIndex;
- 因为在 JS 中 class 是保留字，我们要把 class 改成 className;
<script>
    const element = <div className="app" dataIndex="0">Hello, {contenet}</div>
</script>

# Component

React 的核心特点之一就是组件化;

- 即我们将巨大的业务逻辑拆分成一个个逻辑清晰的小组件;
- 然后通过组合这些组件来完成业务功能;
- React 提供两种组件写法：
  - 函数式组件;
  - 类组件;

# 函数式组件

- 在 React 中，函数式组件会默认接收一个 props 参数，然后返回一段 JSX：
<script>
    function Todo(props){
        return <li>Hello, Cain</li>;
    }
</script>

关于 props 我们将在下一节中讲解。

# 类组件

- 通过继承自 React.Component 的类来代表一个组件:
<script>
    class Todo extends React.Component {
        render(){
            return <li>Hello, Cain</li>;
        }
    }
</script>

我们发现，在类组件中，我们需要在 render 方法里面返回需要渲染的 JSX。

# 组件组合

- 我们可以组合不同的组件来完成复杂的业务逻辑：
<script>
    class App extends React.Component{
        render(){
            return(
                <ul>
                    <Todo />
                    <Todo />
                </ul>
            )
        }
    }
</script>

- 在上面的代码中，我们在类组件 App 中使用了我们之前定义的 Todo 组件
  - 我们看到，组件以 <Component /> 的形式使用,比如 Todo 组件使用时为 <Todo /> ;
  - 我们在 Todo 组件没有子组件时使用这种写法;
- 当 Todo 组件需要包含子组件时，我们需要写成下面的形式：
<script>
    class App extends React.Component{
        render(){
            return(
                <ul>
                    <Todo>Hello World</Todo>
                    <Todo>Hello Cain</Todo>
                </ul>
            )
        }
    }
</script>

# 组件渲染

- 我们在之前讲到,通过 ReactDOM.render 方法接收两个参数：
  - 根组件;
  - 待挂载的 DOM 节点;
- 可以将组件的内容渲染到 HTML 中;
<script>
    ReactDom.render(<App />, document.getElementById("root"));
</script>

# Props

- React 为组件提供了 Props，使得在使用组件时，可以给"组件传入属性"进行个性化渲染。

# 函数式组件中使用 Props

- 函数式组件默认接收 props 参数，它是一个'对象'，用于保存'父组件传递下来'的内容：
<script>
    function Todo(props){
        return (
            <li>Hello, {props.content}</li>
        )
    }

    <Todo content="阿辉" from="阿辉顶累" />
</script>

- 我们给 Todo 函数式组件传递了'content'和'from'属性;
- 所有传递的属性都会合并进 props 对象中,然后传递给 Todo 组件;
- props 对象是这样的:
  - props = { content: "阿辉" , from : "阿辉顶累"};

注意：如果给组件传递 key 属性是不会并入 props 对象中的，所以我们在子组件中也取不到 key 属性，我们将在 列表和 Key 中详细讲解;

# 类组件中使用 Props

- 类组件中基本和函数式组件中的 Props 保持一致,是通过 this.props 来获取父组件传递下来的属性内容:
<script>
    class Todo extends React.Component{
        return() {
            return <li>Hello, {this.props.content}</li>
        }
    }

    <Todo content="类阿辉" from="类阿辉依旧顶累">
</script>

- props 传给 class 的方式与函数式基本一致:
  - props = { content : "类阿辉" from : "类阿辉依旧顶累" };

# State 和生命周期

- React 通过给类组件提供 State 来创造交互式的内容;
  - 即内容可以在渲染之后发生变化;(个人初次印象：跟 vue 一样？)

# 定义 State

- 通过在类组件中添加 constructor 方法，并在其中'定义'和'初始化' State：
<script>
    constructor(props){
        super(props);

        this.state = {
            todoList:[
                "阿辉",
                "阿辉学习笔记",
                "阿辉难顶",
                "阿辉github是chenhui996",
            ];
        };
    }
</script>

- 这里 constructor 方法接收的 props 属性就是之前讲到的那个 props;
- 并且 React 约定,每个继承自 React.Component 的组件:
  - 在定义 constructor 方法时，要在方法内首行加入 super(props) ;
- 接着我们 this.state 来定义组件的 state：
  - 使用 { todoList: ["阿辉", "阿辉学习笔记", "阿辉难顶", "阿辉 github 是 chenhui996"] } 对象来初始化 state。

# 使用 State

- 我们可以在一个组件中的多处地方通过 this.state 的方式来使用 state;
  - 比如这一节中'将要'讲到的'生命周期函数'中;
  - 比如在 render 方法中：

<script>
    class App extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                todoList:[
                    "阿辉",
                    "阿辉学习笔记",
                    "阿辉难顶",
                    "阿辉github是chenhui996",
                ];
            };
        }

        render(){
            return (
                <ul>
                    <Todo content={this.state.todoList[0]} />
                    <Todo content={this.state.todoList[1]} />
                    <Todo content={this.state.todoList[2]} />
                    <Todo content={this.state.todoList[3]} />
                </ul>
            );
        }
    }
</script>

- 我们通过 this.state.todoList 可以获取我们在 constructor 方法中定义的 state
- 可以看到，我们使用 this.state.todoList[0] 的方式替代了之前的 todoList[0];

# 更新 State

- 我们通过 this.setState 方法来更新 state，从而使得网页内容在渲染之后还能变化：
  - this.setState({ todoList: newTodoList });
- 关于 this.setState 我们需要注意以下几点：
  - 不能够通过直接修改 this.state 的方式来更新 state:
    - 错误的：this.state.todoList = newTodoList;
  - State 的更新是合并更新的：
    - 比如原 state 是这样的：

<script>
    constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      nowTodo: '',
    };
  }
</script>

- 然后你调用 this.setState() 方法来更新 state:
<script>
    this.setState({ nowTodo: "Hello, 阿辉" });
</script>
- React 将会合并更新：
  - 将 nowTodo 的新内容合并进原 this.state;
- 当更新之后，我们的 this.state 将会是下面这样的：
  - this.state = { todoList: [], nowTodo: "Hello, 图雀" };
- 不会因为只单独设置了 nowTodo 的值，就将 todoList 给覆盖掉;

# 生命周期函数

- React 提供生命周期函数来追踪一个组件从创建到销毁的全过程。
- 主要包含三个方面：
  - 挂载（Mounting）;
  - 更新（Updating）;
  - 卸载（Unmounting）;

# 挂载（Mounting）

- 其中挂载中主要常用的有三个方法：
  - constructor();
  - render();
  - componentDidMount();
- constructor() 在组件创建时调用:
  - 如果你不需要初始化 State ，即不需要 this.state = { ... } 这个过程,那么你不需要定义这个方法。
- render() 方法是'挂载时'用来'渲染内容'的方法, 每个类组件都需要一个 render 方法;
- componentDidMount() 方法:
  - 当组件挂载到 DOM 节点中之后会调用的一个方法;
  - 我们通常在这里发起一些异步操作:
    - 用于获取服务器端的数据等。(钩子？)

# 卸载（Unmounting）

- 卸载只有一个方法：
  - componentWillUnmount();
- componentWillUnmount()方法：
  - 当组件从 DOM 节点中'卸载之前'会调用的方法;
  - 我们一般在这里面'销毁定时器等'会'导致内存泄露'的'内容';

# 列表和 Key

- 目前我们有四个 Todo 组件，我们是一个一个取值然后渲染，这显得有点原始，并且不可扩展;
- 当我们的 todoList 数组很大的时候（比如 100 个元素），一个一个获取就显得不切实际了
- 这个时候我们就需要'循环'介入了。

# 渲染组件列表

- JSX 允许我们渲染一个列表：
<script>
    render(){
        const todoList = ["阿辉", "阿辉学习笔记", "阿辉难顶", "阿辉github是chenhui996"];
        const renderTodoList = todoList.map((todo) => {
            <Todo content = {todo} />
        });
        return (
            <ul>
                {renderTodoList}
            </ul>
        );
    }
</script>

- 我们通过对 todoList 进行 map 遍历:

  - 返回了一个 Todo 列表;
  - 然后使用 {} 插值语法渲染这个列表;

- 当然我们可以在 JSX 中使用表达式，所以上面的代码可以写成这样：
<script>
    render(){
        const todoList = ["阿辉", "阿辉学习笔记", "阿辉难顶", "阿辉github是chenhui996"];
        return (
            <ul>
                {
                    todoList.map((todo) => {
                        <Todo content = {todo} />
                    })
                }
            </ul>
        );
    }
</script>

# 加上 Key

- React 要求给列表中每个组件加上 key 属性: - 用于标志在列表中这个组件的身份; - 当列表内容进行了修改:增加或删除了元素时; - React 可以根据 key 属性高效的对列表组件进行创建和销毁操作：
<script>
    render(){
        const todoList = ["阿辉", "阿辉学习笔记", "阿辉难顶", "阿辉github是chenhui996"];
        return (
            <ul>
                {
                    todoList.map((todo, index) => (
                        <Todo content = {todo} key = {index} />
                    ))
                }
            </ul>
        );
    }
</script>

- 这里我们使用了列表的 index 作为组件的 key 值;
- React 社区推荐的最佳实践方式是'使用列表数据元素'的'唯一标识符'作为 key 值;
- 如果你的数据是'来自数据库获取'，那么'列表元素数据'的'主键'可以作为 key;
- (个人疑问：为什么上面的箭头函数后是跟()？不是跟{}的吗？)

- 这里的 key 值不会作为 props 传递给子组件
  - React 会在编译组件时将 key 值从 props 中排除;
  - 即最终我们的第一个 Todo 组件的 props 如下：
    - props = { content: "阿辉" };
  - 而不是我们认为的：
    - props = { content: "阿辉", key: 0 };

# 条件渲染

- 在 React 中，我们可以根据不同的情况，渲染不同的内容，这也被成为条件渲染;
<script>
    class Todo extends React.Component{
        render(){
            if(this.props.content === "阿辉"){
                return <li>我认识你，{this.props.content}</li>
            }
            else{
                return <li>我不认识你，{this.props.content}</li>
            }
        }
    }
</script>

- 在上面的代码中，我们判断 this.props.content 的内容;
  - 当内容为 "阿辉" 时，我们渲染 "我认识你，阿辉";
  - 对于其他内容我们就渲染 "我不认识你, 阿辉";

# 三元表达式条件渲染

- 我们还可以直接在 JSX 中使用三元表达式进行条件渲染：
<script>
    class Todo extends React.Component{
        render(){
            return this.props.content === "阿辉" ? (<li>我认识你，{this.props.content}</li>) : (<li>我不认识你，{this.props.content}</li>);
        }
    }
</script>

- 当然'三元表达式'还可以用来'条件渲染不同的' React 元素属性：
  - 下面举一个例子，class 样式名称:

<script>
    class Todo extends React.Component{
        render(){
            return(
                <li className = {this.state.isClicked ? 'isClicked' : 'notClicked'}>我认识你，{this.props.content}</li>
            )
        }
    }
</script>

# 事件处理

- 在 React 元素中处理事件和在 HTML 中类似，就是写法有点不一样;

# JSX 中的事件处理

- 这里的不一样主要包含以下两点：

  - React 中的事件要使用驼峰式命名：onClick，而不是全小写：onclick;
  - 在 JSX 中，你传递的是一个'事件处理函数'，而'不是一个字符串';

- 在 HTML 中，我们处理事件是这样的：
<script>
    <button onclick="handleClick()">点我</button>
</script>
- 在 React 中，我们需要写成下面这样：
<script>
    //Button是一个函数式组件
    function Button(){
        function handlerClick(){
            console.log('按钮被点击了');
        }
        return (
            <button onClick={handlerClick}>点我</button>
        )
    }

</script>

- 注意到我们在上面定义了一个函数式组件:
  - 返回一个按钮;
  - 在按钮上面'定义了点击事件'和'对应的处理方法';

# 合成事件

- 我们在以前编写 HTML 的事件处理时，特别是在处理表单时，常常需要禁用浏览器的默认属性;
  - 比如一般表单提交时都会刷新浏览器;
  - 但是我们有时候希望提交表单之后不刷新浏览器;
  - 所以我们需要禁用浏览器的默认属性;
- 在 HTML 中我们禁用事件的默认属性： - 调用定义在事件上的 preventDefault; - 设置事件的 cancelBubble;
<script>
    document.getElementById('myAnchor').addEventListener('click',function(event){
        event.preventDefault();
    });
</script>

- 在 JSX 中，事件处理和这个类似：
<script>
    function Link(){
        function handleClick(event){
            event.preventDefault();
            console.log('链接被点击了，但是它不会跳转页面，因为默认行为被禁用了');
        }
        return (
            <a onClick={handleClick} href="https://github.com/chenhui996">点我</a>
        );
    }
</script>

# 表单

- 接下来我们来完成增加新的待办事项的功能的第二个步骤：
  - 允许用户将新输入的待办事项加入到 todoList 列表中;
    - 先禁止表单默认事件 preventDefault(e);
    - 获取 nowList，将新的信息覆盖掉获取 nowList;
    - 获取 todoList，将 nowList 用 push 进 todoList 结尾;
    - 最后用 setState 更新 state，然后渲染进页面;
    - 且别忘了清空nowTodo,毕竟是无意义的内存，若是很大的内容，那就亏了;
  - 基本上就是函数调用;

<script>
    handleSubmit(e) {
        e.preventDefault(e);
        const newTodoList = this.state.todoList.concat(this.state.nowTodo);
    
        this.setState({
            todoList: newTodoList,
            nowTodo: ""
        });
    }
</script>

- 本教程中间省略了实战的讲解，就最后表单稍微提及;
- 好奇的小伙伴可以自己看案例，进行分析;
- 实战的最终效果：
    - 异步获取将要展示的待办事项：todoList;
    - 将待办事项展示出来;
    - 偶数项待办事项将会展示成红色;
    - 可以添加新的待办事项;
