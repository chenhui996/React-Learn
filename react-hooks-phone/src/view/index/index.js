import React from "react";
import { connect } from "react-redux"; // 什么用的?
import Tab from "../../common/component/tab";
import "../../common/css/index.css";
import Course from "./course";
import Vip from "./vip";
import Miaov from "./miaov";
import Works from "../../common/component/works";

let imgData = [
  require("../../common/images/tab/img1.png"),
  require("../../common/images/tab/img2.png"),
  require("../../common/images/tab/img3.png"),
  require("../../common/images/tab/img4.png"),
];

function Index(props) {
  // console.log(props);
  return (
    <div>
      <Tab
        data={imgData}
        render={(data, index) => {
          return <img src={data} alt="" />;
        }}
      />
      <section className="index_content">
        <Course />
        <Vip />
        <Miaov />
        <Works />
      </section>
    </div>
  );
}

export default connect((res) => {
  return res;
})(Index);
