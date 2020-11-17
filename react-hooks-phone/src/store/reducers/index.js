// 具体对reducer的处理
// reducers 会有多个reducer函数
// 到时候根据 业务逻辑 进行相应的 拆分
// 若 action 比较复杂，也要考虑将其拆分出去

import getUser from "./login";
export default {
  getUser,
};
