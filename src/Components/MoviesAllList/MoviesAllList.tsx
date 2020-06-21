/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import { Card, List, Button, Modal, Row, Col, Descriptions } from "antd";
import ss from "./MoviesAllList.module.scss";
import noImage from "../../assets/images/no-img.png";

export interface IMoviesAllListData {}

export interface IMoviesAllListHocData {}

export interface IMoviesAllListCallbacks {}

export interface IMoviesAllListHocCallbacks {}

export interface IMoviesAllListProps
  extends IMoviesAllListData,
    IMoviesAllListHocData,
    IMoviesAllListCallbacks,
    IMoviesAllListHocCallbacks {}

export interface ILocalState {
  list?: any[];
  visible?: boolean;
  detail?: any;
}

class MoviesAllList extends React.Component<IMoviesAllListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
      detail: [],
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

  showModal = (item) => {
    let url: any | undefined =
      process.env.REACT_APP_API_URL +
      "?i=" +
      item.imdbID +
      "&plot=full&apikey=" +
      process.env.REACT_APP_API_KEY;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data Detail", data);
        this.setState({ detail: data, visible: true });
      });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { list, detail } = this.state;
    return (
      <div>
        <List
          grid={{ gutter: 16, column: 2 }}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item className={ss.listItemDesign}>
              <Card title={item.Title}>
                <Row gutter={16}>
                  <Col span={15}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="Title">
                        {item.Title}
                      </Descriptions.Item>
                      <Descriptions.Item label="Year">
                        {item.Year}
                      </Descriptions.Item>
                      <Descriptions.Item label="Type">
                        {item.Type}
                      </Descriptions.Item>
                    </Descriptions>
                    <Button
                      className={ss.btn}
                      onClick={() => this.showModal(item)}
                    >
                      Read More
                    </Button>
                  </Col>

                  <Col>
                    <img
                      alt={item.Title}
                      src={item.Poster !== "N/A" ? item.Poster : noImage}
                      width={180}
                      height={200}
                    />
                  </Col>
                </Row>

                <Modal
                  title={detail.Title}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                  width={1000}
                >
                  <h3
                    className={
                      detail.imdbRating >= 7
                        ? ss.boxOfficeHit
                        : ss.boxOfficeFlop
                    }
                  >
                    BoxOffice: {detail.imdbRating >= 7 ? "Hit" : "Flop"}
                  </h3>

                  <Row gutter={16}>
                    <Col span={8}>
                      <img
                        alt={detail.Title}
                        src={detail.Poster !== "N/A" ? detail.Poster : noImage}
                        height={370}
                      />
                    </Col>
                    <Col span={12}>
                      <Descriptions column={1}>
                        <Descriptions.Item label="ImdbRating">
                          {detail.imdbRating}
                        </Descriptions.Item>
                        <Descriptions.Item label="Director">
                          {detail.Director}
                        </Descriptions.Item>
                        <Descriptions.Item label="Actor">
                          {detail.Actors}
                        </Descriptions.Item>
                        <Descriptions.Item label="Genre">
                          {detail.Genre}
                        </Descriptions.Item>
                        <Descriptions.Item label="Awards">
                          {detail.Awards}
                        </Descriptions.Item>
                        <Descriptions.Item label="Language">
                          {detail.Language}
                        </Descriptions.Item>
                        <Descriptions.Item label="Year">
                          {detail.Year}
                        </Descriptions.Item>
                        <Descriptions.Item label="Country">
                          {detail.Country}
                        </Descriptions.Item>

                        <Descriptions.Item label="Type">
                          {detail.Type}
                        </Descriptions.Item>
                        <Descriptions.Item label="Released">
                          {detail.Released}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Modal>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default MoviesAllList;
