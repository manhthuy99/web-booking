import React from 'react';
import { Table, Space } from 'antd';
import qs from 'qs';
import MainLayout from '../../components/layout/MainLayout';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const getRandomuserParams = params => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class ListUser extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          data: data.results,
          pagination: {
            ...params.pagination,
            total: 20,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
        <MainLayout>
            <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
        </MainLayout>
      
    );
  }
}
export default ListUser;