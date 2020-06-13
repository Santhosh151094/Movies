import React, { Component } from "react";
import { Modal } from "antd";

export interface IDetailData {}

export interface IDetailHocData {
  editValue?: boolean | undefined;
}

export interface IDetailCallbacks {
  handleLoading?(): any;
}

export interface IDetailHocCallbacks {
  editHandled?(): any | undefined;
}

export interface IDetailProps
  extends IDetailData,
    IDetailHocData,
    IDetailCallbacks,
    IDetailHocCallbacks {}

export interface ILocalState {
  visible?: boolean;
}

class Detail extends React.Component<IDetailProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    console.log("Detail Props", this.props);
  }

  showModal = () => {
    this.setState({
      visible: true,
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
    console.log("Detail");
    return (
      <div>
        <Modal
          title="Basic"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>Email</p>
          <p>Phone</p>
          <p>Company</p>
        </Modal>
      </div>
    );
  }
}

export default Detail;
