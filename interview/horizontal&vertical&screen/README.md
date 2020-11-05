# 检测手机横屏还是竖屏

- 有时候，我们的产品，不想让用户 '横屏' 或者 '竖屏';
  - 那么，我们就需要做处理;

## @media

- css 检测

### 横屏下样式

```css
@media all and(orientation: landscape) {
  // somthing
}
```

- 但是@media 横竖屏检测不太安全(不靠谱);
  - 手机的自带键盘弹出:
    - 导致手机 '宽' 和 '高' 发生变化:
      - 然而@media 是按照:
        - 手机屏幕的 '宽高' 来测和 '判断' 横竖屏的:
    - 所以，不太靠谱;

---

- 正确手段, 靠 ———— JS;

## window.orientation

- alert(window.orientation);
- 手机 '横竖屏' 检测:
  - 直接监听手机 '四' 个方向;
    - 竖屏:
      - 正常(竖屏):
        - 输出:0
      - 180 反转(竖屏旋转 180 度):
        - 输出: 180
    - 横屏:
      - 顺时针 90:
        - 输出:90
      - 逆时针 90:
        - 输出:-90
- 但是，不做处理的话，每次都要 '刷新一次' ，才能生效:
  - 这对交互是不友好的(咱们什么时候玩游戏、看电影横个屏，还要刷新么?)

### orientationchange

- 事件:
  - 监听 '横竖屏' 发生切换(成功达成 '自动检测横竖屏' 的需求);
- 声明一个方法:
  - 注意: 这类事件，基本都属于 winodw 下的事件;

```js
function getOrientation() {
  // alert(window.orientation);
  switch (window.orientation) {
    case 90:
    case -90:
      box.style.display = "flex"; // box可以是提示框的mask, 盖在上面;
    default:
      box.style.display = "none";
      break;
  }
}
// orientationchange : 监听 '横竖屏' 发生切换
window.addEventListener("orientationchange", getOrientation);
getOrientation(); // 初始的时候'执行' ,所以第一次，还是要调用一下;
```

## devicemotion

- 检测手机 '加速度' 发生变化;
- acceleration: 手机的加速度(手机在运动)

```js
window.addEventListener("devicemotion", function (e) {
  // acceleration
  const { x, y, z } = e.acceleration; // 陀螺仪很敏感
  console.log(x, y, z);
  div.innerHTML = `
        x: ${x.toFixd(0)}<br/>
        y: ${y.toFixd(0)}<br/>
        z: ${z.toFixd(0)}<br/>
    `;
});
```

- accelerationIncludingGravity: 手机重力加速度(重力 + 手机自身的运动速度)

```js
window.addEventListener("devicemotion", function (e) {
  // acceleration
  const { x, y, z } = e.accelerationIncludingGravity; // 陀螺仪很敏感
  console.log(x, y, z);
  div.innerHTML = `
        x: ${x.toFixd(0)}<br/>
        y: ${y.toFixd(0)}<br/>
        z: ${z.toFixd(0)}<br/>
    `;
});
```

## 小结

### 做一个平衡球

```js
let translateX = 0;
window.addEventListener("devicemotion", function (e) {
  // acceleration
  const { x, y, z } = e.acceleration;
  const { x: x2, y: y2, z: z2 } = e.accelerationIncludingGravity;
  x2 -= x;
  x2 = Math.round(x);
  translateX += x;
  box.style.transform = `translateX(${translateX}px`;
});
```

## 监听手机加速度的坑

- 安卓和 IOS 方向相反;
  - 要分别取反;
- 处理方式:
  - 获取当前设备，进行筛选;

### window.navigator.userAgent

- 检测设备信息:
  - Android
  - iphone
  - ipad
- 写个例子:
  - 获取 IOS:

```js
function getIos() {
  var u = window.navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;))? CPU.+Mac OS X/);
}

// 然后再引用上面的例子，分开处理
let translateX = 0;
window.addEventListener("devicemotion", function (e) {
  // acceleration
  const { x, y, z } = e.acceleration;
  const { x: x2, y: y2, z: z2 } = e.accelerationIncludingGravity;
  x2 -= x;
  x2 = Math.round(x2);
  // 当检测到false时，代表不是IOS设备，那么即取反值
  if (!getIos()) {
    x2 = -x2;
  }
  translateX += x2;
  box.style.transform = `translateX(${translateX}px`;
});
```

### IOS 10.X 与 HTTPS

- 在 IOS 10.X 之后:
  - 如果想要使用 devicemotion 等:
    - 速度与方向 API;
  - 必须在 https 协议下使用;

### IOS 12.2 之后

- 用户可以在 '手机设置' 中:
  - 关闭 '速度与方向' 的权限获取;

---

- 而且，用户设置关闭之后，我们这边是没办法处理的;
  - 只能做到:
    - 提示:
      - 但是要提示:
        - 就要检测:
          - IOS 设备是否:
            - 关闭了 '速度与方向' 的权限获取;

```js
// 检测 是否有方向与动作 的访问权限
(function () {
  let timer = 0;
  timer = setTimeout(() => {
    alert("请开启 动作与方向 的访问权限");
  }, 500);
  window.addEventListener(
    "devicemotion",
    () => {
      clearTimeout(timer);
    },
    { once: true }
  );
})();
```

### IOS 13 中

- 在 IOS 13 中:
  - 苹果的开发团队:
    - 感觉还是这个 API 不够安全;
- 故, 要求:
  - 应用 需要使用:
    - 动作与方向的权限时:
      - 需要向 '用户申请授权';

```js
// 第一步:
// 还是检测 是否有方向与动作 的访问权限
(function () {
  let timer = 0;
  timer = setTimeout(() => {
    alert("请开启 动作与方向 的访问权限");
  }, 500);
  window.addEventListener(
    "devicemotion",
    () => {
      clearTimeout(timer);
    },
    { once: true }
  );
})();

// 第二步:
// 向 用户 申请授权:
function setMotion(cb) {
  let fn = (e) => {
    const { x, y, z } = e.acceleration;
    const { x: x2, y: y2, z: z2 } = e.accelerationIncludingGravity;
    if (getAdr()) {
      // 取反逻辑
      e.acceleration.x = -x;
      e.acceleration.y = -y;
      e.acceleration.z = -z;
      e.accelerationIncludingGravity.x = -x2;
      e.accelerationIncludingGravity.y = -y2;
      e.accelerationIncludingGravity.z = -z2;
    }
    cb(e);
  };
  if (DeviceMotionEvent.requestPermission) {
    // IOS 13 及 之后
    DeviceMotionEvent.requestPermission().then(
      (permissionState) => {
        if (permissionState === "granted") {
          // alert("success");
          widnow.addEventListener("devicemotion", fn);
        } else {
          alert("failed");
        }
      },
      () => {
        alert("failed");
      }
    );
  } else {
    // IOS 13 之前
    widnow.addEventListener("devicemotion", fn);
  }
}
```

### IOS 13.3 中:

- IOS 13.3 中:
  - 要求获取 '动作与方向' 的 '授权' 时:
    - 必须用户 '手动触发';
