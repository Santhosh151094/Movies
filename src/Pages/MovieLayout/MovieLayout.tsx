import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import MoviesListPage from "../MoviesListPage/MoviesListPage";
import ss from "./MovieLayout.module.scss";
const { Header, Content, Footer } = Layout;

class MovieLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className={ss.logo} />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Menu 1</Menu.Item>
            <Menu.Item key="3">Menu 2</Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <p className={ss.heading}>Movies</p>
            <MoviesListPage />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2020 Developed by Santhosh
        </Footer>
      </Layout>
    );
  }
}

export default MovieLayout;
