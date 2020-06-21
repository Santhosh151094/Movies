/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import { Tabs, Card, Row, Col } from "antd";
import ss from "./PosterList.module.scss";
import noImage from "../../assets/images/no-img.png";

export interface IPosterListData {}

export interface IPosterListHocData {}

export interface IPosterListCallbacks {}

export interface IPosterListHocCallbacks {}

export interface IPosterListProps
  extends IPosterListData,
    IPosterListHocData,
    IPosterListCallbacks,
    IPosterListHocCallbacks {}

export interface ILocalState {
  list?: any;
}

class PosterList extends React.Component<IPosterListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    let url: any | undefined =
      process.env.REACT_APP_API_URL +
      "?s=x%20men&y=2000&apikey=" +
      process.env.REACT_APP_API_KEY;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ list: data.Search });
      });
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <Row gutter={16}>
          {list.map((item, i) => (
            <Col span={8} className={ss.columnDesign} key={i}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.Title}
                    src={item.Poster !== "N/A" ? item.Poster : noImage}
                    style={{ height: "500px" }}
                  />
                }
              >
                <h3 style={{ textAlign: "center" }}>{item.Title}</h3>
                <p style={{ textAlign: "center" }}>Year: {item.Year}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default PosterList;
