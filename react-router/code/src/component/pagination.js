import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data";

function Pagination(props) {
  const { type = "all", page = 1 } = useParams();
  let nowData = [];
  if (type === "all") {
    for (let key in data) {
      for (let i = 0; i < data[key].length; i++) {
        nowData.push(data[key][i]);
      }
    }
  } else {
    nowData = data[type];
  }
  const len = 6; // 每页显示6条
  const pageLen = Math.ceil(nowData.length / len);

  function setNub() {
    let nubs = [];
    for (let i = 1; i <= pageLen; i++) {
      if (i == page) {
        nubs.push(
          <Link className="active" to={`/${type}/${i}`} key={i}>
            {i}
          </Link>
        );
      } else {
        nubs.push(
          <Link to={`/${type}/${i}`} key={i}>
            {i}
          </Link>
        );
      }
    }
    return nubs;
  }

  return (
    <div>
      <nav className="pagination">
        <Link to={`/${type}/${Number(page) > 1 ? Number(page) - 1 : 1}`} key={Number(page)}>
          上一页
        </Link>
        {setNub()}
        <Link to={`/${type}/${ Number(page) < Number(pageLen) ? Number(page) + 1 : Number(pageLen)}`} key={Number(pageLen) + 1}>
          下一页
        </Link>
      </nav>
    </div>
  );
}
export default Pagination;
