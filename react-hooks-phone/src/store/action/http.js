import axios from "axios";
import qs from "qs";

// 请求层

// withCredentials:
// 作用: 请求携带cookie;
// 我们请求登陆的时候, 要把后端发送给我们的cookie校验, 再传给后端;
// 这样, 后端就知道我们对应的是哪台设备, 或者说知道我们是哪个单点登陆的信息;

// transformRequest
// 拦截器
// renturn 地址 : 因为data有可能是中文
// 故要将data地址，通过qs进行编译转换

// qs
// 作用: 把url请求, 转换成编码状态;

const http = axios.create({
  baseURL: "/miaov",
  withCredentials: true,
  transformRequest: (data) => {
    return qs.stringify(data);
  },
});

export default http;

// 自测
// 写完，去 header.js 测试一下:
// 步骤:
// 1.在 header.js 中引入上面定义的 http;