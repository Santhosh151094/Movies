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
} from "antd";
import CommonModal from "../../Components/CommonModal/CommonModal";
import {
  DeleteOutlined,
  WechatOutlined,
  FundViewOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Detail from "../../Components/Detail/Detail";

export interface IContactListPageData {
  editValue?: boolean | undefined;
}

export interface IContactListPageHocData {}

export interface IContactListPageCallbacks {
  editHandled?(): any | undefined;
}

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
    this.setState({ editModal: true, detail: item });
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
    });
    this.componentDidMount();
    //this.props.handleLoading(true);
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
              style={{ fontSize: "20px", color: "#1890ff" }}
            />
            <FundViewOutlined
              onClick={() => this.handleDetail(record)}
              style={{
                fontSize: "20px",
                color: "#1890ff",
                marginLeft: "30px",
                cursor: "pointer",
              }}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <DeleteOutlined
                style={{ fontSize: "20px", color: "red", marginLeft: "30px" }}
              />
            </Popconfirm>

            <Popover content={"Chat feature Coming soon!!"} trigger="hover">
              <WechatOutlined
                style={{
                  fontSize: "20px",
                  marginLeft: "30px",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
              />
            </Popover>
          </span>
        ),
      },
    ];

    const IDetailProp = {
      // make sure all required component's inputs/Props keys&types match
      editValue: this.state.editModal,
    };
    // const IDetailCallbacks = {
    //   editHandled: this.handleEdit,
    // };

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <CommonModal />
          <Table
            bordered={true}
            rowKey="id"
            columns={columns}
            dataSource={list}
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       this.handleDetail(record);
            //     },
            //   };
            // }}
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
