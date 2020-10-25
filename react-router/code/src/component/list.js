import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";

export default function List() {
  const { type = "all", page = 1 } = useParams();
  let nowData=[];
  if(type == "all"){
    for( let key in data){
      for(let i = 0; i < data[key].length; i++){
        nowData.push(data[key][i]);
      }
    }
  }
  else{
    nowData = data[type];
  }
  const len = 6; // 每页显示6条
  let start = (page - 1) * len;
  let end = start + len;
  nowData = nowData.filter((item, index) => index >= start && index < end);
  return (
    <ul className="list">
      {nowData.length
        ? nowData.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })
        : "暂无数据"}
    </ul>
  );
}
