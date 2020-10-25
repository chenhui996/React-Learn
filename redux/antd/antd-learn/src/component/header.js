import React from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { navs } from "../router/index";

function Header() {
  return (
    <Layout.Header>
      <div className="wrap">
        <Row>
          <Col span={4}>
            <h1 id="logo">
              <Link to="/">Cain-CNode</Link>
            </h1>
          </Col>
          <Col span={20}>
            <Nav
              data={navs}
              theme="dark"
              selected={({ pathname }) => {
                let key = navs.findIndex((item) => {
                  if (pathname === item.to) {
                    return true;
                  } else {
                    return false;
                  }
                });
                return key + "";
              }}
            />
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
}

export default Header;
