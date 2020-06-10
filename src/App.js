import React, { Component } from "react";
import { Table, Modal, Spin } from "antd";
import ContactModal from "./Components/ContactModal/ContactModal";
import "./App.css";
import Detail from "./Components/Detail/Detail";

const columns = [
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
    title: "Contact Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      detailModal: false,
      detail: {},
      loading: true,
    };
  }

  componentDidMount() {
    let url = process.env.REACT_APP_API_URL;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ contacts: data, loading: false });
      });
  }

  showModal = () => {
    this.setState({
      detailModal: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      detailModal: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      detailModal: false,
    });
  };

  contactDetail = (item) => {
    this.setState({ detailModal: !false, detail: item });
  };

  handleLoad = (item) => {
    console.log("handleLoad");
    this.setState({ loading: item });
    this.componentDidMount();
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <ContactModal handleLoading={this.handleLoad} />
          {/* Detail Modal */}
          <Modal
            title="Contact Detail"
            visible={this.state.detailModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Name: {this.state.detail.name}</p>
            <p>Email: {this.state.detail.email}</p>
            <p>Phone: {this.state.detail.phone}</p>
            <p>Company: {this.state.detail.company}</p>
          </Modal>
          {/* Detail Modal End */}
          <Table
            bordered={true}
            rowKey={columns.key}
            columns={columns}
            dataSource={contacts}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  this.contactDetail(record);
                },
              };
            }}
          />
        </Spin>
      </div>
    );
  }
}

export default App;
