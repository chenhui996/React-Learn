import React, { useEffect } from "react";
import { List } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import { useGetTopics } from "../../store/action";
import Data from "../../static/data";

function IndexList() {
  // const { loading, data } = useSelector((state) => state.topics);

  // 由于cnodejs.org打不开，故用临时数据先进行开发
  const { loading = false, data } = Data;
  const { search } = useLocation();
  const { page = 1, tab = "all" } = qs.parse(search.slice(1));
  const getTopics = useGetTopics();

  useEffect(() => {
    getTopics(page, tab);
  }, [page, tab]);
  return (
    <div>
      <List
        dataSource={data}
        loading={loading}
        style={{
          background:"#fff",
          padding: "0 15px"
        }}
        renderItem={(item) => {
          return (
            <List.Item style={{
              padding:"10px 20px"
            }}>
              <Link to={"/topic/" + item.id}>{item.title}</Link>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default IndexList;
