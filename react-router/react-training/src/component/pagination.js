import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data";

function Pagination(props) {
  const { type = "good", page = 1 } = useParams();
  let nowData = data[type];
  const len = 5; // 每页显示5条
  const pageLen = Math.ceil(nowData.length / len);

  function setNub() {
    let nubs = [];
    for (let i = 1; i <= pageLen; i++) {
      if( i == page ){
        // console.log("dsad");
        nubs.push(<span key={i}>{i}</span>);
      }else{
        nubs.push(<Link to={`/list/${type}/${i}`} key={i}>{i}</Link>);
      }
    }
    return nubs;
  }

  return (
    <div>
      <h1>{pageLen}</h1>
      <nav>{setNub()}</nav>
    </div>
  );
}
export default Pagination;
