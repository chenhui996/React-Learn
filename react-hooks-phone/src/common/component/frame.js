import React, { useState, useEffect, useRef } from "react";
import { useInnerHeight } from "../hooks/index";
import BScroll from "better-scroll";
import Header from "./header";
import Menu from "./menu";
import "../css/reset.css";
import "../css/common.css";

export default function Frame(props) {
  // console.log(props);
  const [showMenu, setShowMenu] = useState(false);
  const innerH = useInnerHeight();
  let pageScroll = null;
  const wrap = useRef(null);
  function changeShow() {
    setShowMenu(!showMenu);
  }
  function menuHide() {
    setShowMenu(false);
  }
  useEffect(() => {
    // console.log(wrap.current);
    pageScroll = new BScroll(wrap.current,{
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
      }
    });
  }, [pageScroll]);
  return (
    <div>
      <Header changeShow={changeShow} />
      <Menu />
      <div
        id="main"
        style={{
          transform: `translateX(${showMenu ? 4.5 : 0}rem)`,
          height: innerH,
        }}
        onTouchStart={menuHide}
      >
        <div ref={wrap} className="pageWrap">
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
