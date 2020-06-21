/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import { Tabs } from "antd";
import PosterList from "../../Components/PosterList/PosterList";
import MoviesAllList from "../../Components/MoviesAllList/MoviesAllList";

const { TabPane } = Tabs;

export interface IMoviesListPageData {}

export interface IMoviesListPageHocData {}

export interface IMoviesListPageCallbacks {}

export interface IMoviesListPageHocCallbacks {}

export interface IMoviesListPageProps
  extends IMoviesListPageData,
    IMoviesListPageHocData,
    IMoviesListPageCallbacks,
    IMoviesListPageHocCallbacks {}

export interface ILocalState {}

class MoviesListPage extends React.Component<
  IMoviesListPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  callback = (key) => {
    console.log(key);
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Movies List" key="1">
            <MoviesAllList />
          </TabPane>
          <TabPane tab="Movie Posters" key="2">
            <PosterList />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default MoviesListPage;
