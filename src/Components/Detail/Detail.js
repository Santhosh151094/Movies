import React, { Component } from "react";
import { Modal, Button, Form, Input } from "antd";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {}

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
    console.log("this.props", this.props);
    return (
      <div>
        <Modal
          title="Contact Detail"
          visible={this.props.value}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          sdada
        </Modal>
      </div>
    );
  }
}

export default Detail;
