import Button from "antd/lib/button";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render(): ReactNode {
    return (
      <>
        <h1>Coder X 一个任劳任怨的码农机器人</h1>
        <img alt="暂无图片" src="" />
        <Button type="primary">
          <Link to='/design'>开始设计</Link>
        </Button>

      </>
    )
  }
}
