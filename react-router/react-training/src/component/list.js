import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";

export default function List() {
  const { type = "good", page = 1 } = useParams();
  let nowData = data[type];
  const len = 5; // 每页显示5条
  let start = (page - 1) * len;
  let end = start + len;
  nowData = nowData.filter((item, index) => index >= start && index < end);
  console.log(nowData);
  return (
    <ul>
      {nowData.length
        ? nowData.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })
        : "暂无数据"}
    </ul>
  );
}
