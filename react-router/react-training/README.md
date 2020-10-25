# react-router 学习 2

## Navlink

- 在 Link 功能的基础上，添加了选中当前项的效果;
- NavLink 在匹配当前项时，默认也是模糊匹配;

### activeClassName

- 当前选中项的 class，默认为 active
  - 自定义 activeClassName：
    - 在 css 中定义好名称;
    - 进入导航 NavLink，逐个加 activeClassName:

```js
<NavLink to="/" exact activeClassName="custom">
  首页
</NavLink>
```

### activeStyle

- 选中之后的样式
- 用法:
  - 正常的行内样式用法;

```js
<NavLink to="/" exact activeClassName="custom" activeStyle={{font-size:"16px"}}>
  首页
</NavLink>
```

### isActive

- 判断当前项是否选中
  - 本身接收的是一个函数;
    - 当函数返回值为 true 时，即为选中;

```js
<NavLink to="/" exact
    activeClassName="custom"
    activeStyle={{font-size:"16px"}}
    isActive={() => {
        return true;
    }}>
  首页
</NavLink>
```

- 这样设置后，无论如何，这个标签都是选中状态(不管我们如何切换);
  - 反之则不选中;

## 通过 Route 去调用视图

- 方法:
  - component:
    - 通过组件直接调用:
      - 弊端:
        - 无法获取状态;
  - render:
    - 接收的是回调函数:
      - 回调函数的返回值中定义:
        - 该 Route 要渲染的视图;
          - 用法:

```js
<Nav />
    <Route
        path="/"
        exact
        render = {() => {
          return <Index username={username} />
    }}
/>
```

- 这样，用 useState 定义好的 username 就能通过 render 传递给 Index 子组件了;

## 路由组件

- 被 Route 直接调用的组件;(用 component 调用的路由组件)
- 在路由组件中:
  - 可以获取到 Route 传递的路由参数;(即子组件的 props)

### 路由参数

- 打印出子组件的 props 即发现路由参数:
  - history(本质上就是在 windows.history 的基础上封装的):
    - 浏览器或 windows 下的 history 对象;
    - 重点方法:
      - go(n):
        - 跳转当前的历史记录, 跳转 n 步;
      - goBack():
        - 返回历史记录上一步;
      - goForward():
        - 前进到历史记录下一步;
      - push(url, state):
        - url: 在不刷新页面的情况下，跳转至 url;
        - state: 向即将跳转的 url 传递参数(可在目标 url 上的 location.state 中找到该数值);
      - length:
        - 当前历史记录中，记录了多少项;
  - location(本质上就是在 windows.location 的基础上封装的, 且区别不大):
    - hash: ""
      - 当前 url 中的 hash 值;
    - pathname: "/something"
      - 当前的 url;
    - search: ""
      - 当前 url 的 search 值;
    - state:
      - push 方法传递过来的数据;
  - match:
    - 当前路由的匹配信息;
    - 几个值:
      - isExact: true
        - 是否精确匹配;
      - params: {}
        - 动态路由传递的参数;
      - path: "/something"
        - 给 Route 定义的 path 属性
      - url: "/something"
        - 浏览器的 url

## 动态路由

- 动态路由在定义 path 时:
  - 路由中某一段可能是:
    - 非固定的;
  - 非固定部分可以通过:
    - `:name`来定义;
  - 在'路由参数'中:
    - 可通过 match.params:
      - 来'获取动态路'由具体的'值';

## 细节问题

### 通过 render 调用的视图组件, 其'路由参数'去哪了？

- 路由参数会被传递给 render 的回调函数;

### 如何在'非路由导航'中'获取路由参数'?

- 两种方案;
- 第一种方案:
  - 高阶路由(高阶组件):
    - 调用该方法时:
      - 返回一个新的组件;
    - 方法:
      - withRouter(cmp);
        - 适用于'类组件'和'函数组件';

```js
// 返回一个新的组件 newCmp
const newCmp = withRouter(cmp);
```

- 第二种方案:
  - hooks 轻松获取:
    - 调用各种 hooks 专用组件:
      - 直接获取(爽);
    - 方法:
      - useHistory:
        - 获取 history 对象;
      - useLocation:
        - 获取 location 对象;
      - useParams:
        - 获取动态路由参数;
      - useRouteMatch:
        - 获取 match 对象;
- 注意:
  - hooks 是 Route 5 之后才有的;
  - hooks 只能用在'函数组件'上;

## Redirect 重定向

- 当我们:
  - 去'访问'某个'地址'的时候:
    - 中间加了:
      - 验证;
        - 导致不能直接跳转:
          - 那么, 我们就走了一个所谓的:
            - 重定向;

```js
<Route
  path="/list/:page"
  exact
  render={(username) => {
    if (username) {
      <ListView pagename={pagename} />;
    } else {
      return <Redirect to="/something" />;
    }
  }}
/>
```
