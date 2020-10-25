import React from "react";
import banner_img from "../img/img4.png";
import img1 from "../img/img_1.png";
import img2 from "../img/img_2.png";

function Index() {
  return (
    <div>
      <img src={banner_img} className="banner" />
      <div className="wrap">
        <img src={img1} />
        <img src={img2} />
      </div>
    </div>
  );
}

export default Index;
