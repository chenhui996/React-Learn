import React from "react";
import { List } from "antd";
import { useSelector } from "react-redux";

function IndexList() {
  const { loading, data } = useSelector((state) => state.topics);
  return (
    <div>
      <List dataSource={data} loading={loading} />
    </div>
  );
}

export default IndexList;
