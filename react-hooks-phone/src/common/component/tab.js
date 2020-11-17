import React, { useEffect, useRef, useState } from "react";
import BScroll from "better-scroll";

function Tab(props) {
  const { data, render } = props;
  const bannerWrap = useRef(null);
  const [now, setNow] = useState(0);
  let bScroll = null;
  useEffect(() => {
    let timer = 0;
    bScroll = new BScroll(bannerWrap.current, {
      scrollX: true,
      scrollY: false,
      eventPassthrough: "vertical",
      momentum: false,
      snap: {
        loop: true,
      },
    });
    bScroll.on("scrollEnd", () => {
      setNow(bScroll.getCurrentPage().pageX);
    });
    timer = setInterval(() => {
      bScroll.next(400);
    }, 2000);
    bannerWrap.current.addEventListener("touchstart", () => {
      clearInterval(timer);
    });
    bannerWrap.current.addEventListener("touchend", () => {
      timer = setInterval(() => {
        bScroll.next(400);
      }, 2000);
    });
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="banner">
      <div className="banner_img" ref={bannerWrap}>
        <ul className="banner_list clearfix">
          {data.map((item, index) => {
            return <li key={index}>{render(item)}</li>;
          })}
        </ul>
      </div>
      <ul className="banner_nav">
        {data.map((item, index) => {
          return (
            <li key={index} className={index === now ? "active" : ""}></li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tab;
