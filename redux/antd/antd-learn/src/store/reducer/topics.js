// 纯函数
function topics(
  topics = {
    loading: true,
    data: [],
  },
  action
) {
  switch (action.type) {
    case "TOPICS_LOAD": // 当前正在请求数据
      return {
        loading: true,
        data: [],
      };
    case "TOPICS_GET": // 获取到数据
      return {
        loading: false,
        data: action.data,
      };

    default:
      break;
  }
  return topics;
}

export default topics;
