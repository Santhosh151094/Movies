import React, { Component } from "react";
import { Modal, Button, Form, Input } from "antd";

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    console.log("props", this.props);
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

  contactSubmit = (e) => {
    console.log("e", e);
    fetch(process.env.REACT_APP_API_URL, {
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
    this.props.handleLoading(true);
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Contact
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button form="contactForm" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
        >
          <Form
            //{...layout}
            name="contactForm"
            onFinish={this.contactSubmit}
            resetFields={[]}
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

export default ContactModal;
