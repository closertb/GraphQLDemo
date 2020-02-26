import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'antd';
import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query UserQuery($pageNum: Int,$pageSize:Int){
    users(pageNum:$pageNum,pageSize:$pageSize ) {
      pageNum
      pageSize
      total
      data {
        id
        userName
        military
        enlistYear
      }
    }
  }
`;
const columns = [{
  title: '序号',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '姓名',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '军衔',
  dataIndex: 'military',
  key: 'military',
}, {
  title: '入伍时间',
  dataIndex: 'enlistYear',
  key: 'enlistYear',
}, {
  title: '操作',
  dataIndex: 'id',
  key: 'detailId',
  render: id => <Link to={`/militaryList/${id}/detail`}>详情</Link>,
}];

export default function MiltaryList() {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: {
      pageNum: 1,
      pageSize: 5,
    }
  });
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="loading">
        {error.message || '未知错误'}
      </div>
    );
  }
  const { data: lists, total } = data.users;
  const tableProps = {
    dataSource: lists,
    columns,
    rowKey: 'id',
  };
  return (
    <div>
      <p className="total">总共有<span>{total}</span>名军士</p>
      <Table {...tableProps} />
    </div>
  );
}
