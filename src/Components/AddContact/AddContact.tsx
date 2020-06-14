/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import { Modal, Button, Form, Input } from "antd";
import ss from "./AddContact.module.scss";

export interface IAddContactData {}

export interface IAddContactHocData {}

export interface IAddContactCallbacks {}

export interface IAddContactHocCallbacks {}

export interface IAddContactProps
  extends IAddContactData,
    IAddContactHocData,
    IAddContactCallbacks,
    IAddContactHocCallbacks {}

export interface ILocalState {
  visible?: boolean;
}

class AddContact extends React.Component<IAddContactProps, ILocalState> {
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
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  contactSubmit = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.name,
        email: e.email,
        phone: e.phone,
        company: e.company,
      }),
    });
    this.setState({
      visible: false,
    });
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Button
            type="primary"
            onClick={this.showModal}
            className={ss.addButton}
          >
            + Add Contact
          </Button>
        </div>
        <Modal
          title="Add Contact"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              form="contactForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            //{...layout}
            name="contactForm"
            onFinish={this.contactSubmit}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter a name!",
                },
              ]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter a email!",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter a phone number!",
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>

            <Form.Item
              name="company"
              rules={[
                {
                  required: true,
                  message: "Please enter a Company!",
                },
              ]}
            >
              <Input placeholder="Enter Company Name" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AddContact;
