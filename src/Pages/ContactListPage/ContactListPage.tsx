/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Popover,
  Modal,
  Form,
  Input,
  Spin,
  Alert,
} from "antd";
import AddContact from "../../Components/AddContact/AddContact";
import {
  DeleteOutlined,
  WechatOutlined,
  FundViewOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ss from "./ContactListPage.module.scss";

export interface IContactListPageData {
  editValue?: boolean | undefined;
}

export interface IContactListPageHocData {}

export interface IContactListPageCallbacks {}

export interface IContactListPageHocCallbacks {}

export interface IContactListPageProps
  extends IContactListPageData,
    IContactListPageHocData,
    IContactListPageCallbacks,
    IContactListPageHocCallbacks {}

export interface ILocalState {
  list?: any;
  detailModal?: boolean;
  detail?: any;
  loading?: boolean;
  editModal?: boolean;
  message?: string;
}

class ContactListPage extends React.Component<
  IContactListPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      detailModal: false,
      detail: {},
      loading: true,
      editModal: false,
      message: "",
    };
  }

  componentDidMount() {
    let url: any | undefined = process.env.REACT_APP_API_URL;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ list: data, loading: false });
      });
  }

  handleDelete = (item) => {
    fetch(process.env.REACT_APP_API_URL + "/" + item, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
    this.setState({ message: "Contact Deleted Successfully!" });
    this.componentDidMount();
  };

  showModal = () => {};

  handleOk = (e) => {
    this.setState({
      detailModal: false,
      editModal: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      detailModal: false,
      editModal: false,
    });
  };

  handleDetail = (item) => {
    this.setState({ detailModal: true, detail: item });
  };

  handleEdit = (item) => {
    this.setState({
      editModal: true,
      detail: item,
    });
  };

  contactSubmit = (item) => {
    fetch(process.env.REACT_APP_API_URL + "/" + this.state.detail.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        email: item.email,
        phone: item.phone,
        company: item.company,
      }),
    });
    this.setState({
      editModal: false,
      message: "Contact Edited Successfully!",
    });
    this.componentDidMount();
  };

  render() {
    const { list } = this.state;
    const columns = [
      {
        title: "S.No",
        dataIndex: "index",
        render: (value, item, index) => 1 + index,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Delete",
        dataIndex: "",
        key: "delete",
        render: (text, record) => (
          <span>
            <EditOutlined
              onClick={() => this.handleEdit(record)}
              className={ss.editIcon}
            />
            <FundViewOutlined
              onClick={() => this.handleDetail(record)}
              className={ss.detailIcon}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <DeleteOutlined className={ss.deleteIcon} />
            </Popconfirm>

            <Popover content={"Chat feature Coming soon!!"} trigger="hover">
              <WechatOutlined className={ss.chatIcon} />
            </Popover>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Spin spinning={this.state.loading}>
          {this.state.message && (
            <Alert message={this.state.message} type="success" showIcon />
          )}
          <AddContact />
          <Table
            bordered={true}
            rowKey="id"
            columns={columns}
            dataSource={list}
          />

          {/* Detail */}
          <Modal
            title={this.state.detail.name}
            visible={this.state.detailModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <p>Email: {this.state.detail.email}</p>
            <p>Phone: {this.state.detail.phone}</p>
            <p>Company: {this.state.detail.company}</p>
          </Modal>

          {/* Edit */}

          {this.state.editModal && (
            <Modal
              title="Edit Contact"
              visible={this.state.editModal}
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
                initialValues={{
                  name: this.state.detail.name,
                  email: this.state.detail.email,
                  phone: this.state.detail.phone,
                  company: this.state.detail.company,
                }}
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
          )}
        </Spin>
      </div>
    );
  }
}

export default ContactListPage;
