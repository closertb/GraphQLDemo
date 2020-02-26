import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'antd';
import gql from 'graphql-tag';

const columns = [{
  title: '序号',
  dataIndex: 'book_id',
  key: 'id',
}, {
  title: '书名',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'url',
  dataIndex: 'image',
  key: 'image',
}];

export const BOOKS_QUERY = gql`
  query($top: Int){
    collections(top: $status) {
      total
      collections {
        book_id
        title
        image
      }
    }
  }
`;

export default function BookList(props) {
  const { top } = props;
  const { loading, error, data } = useQuery(BOOKS_QUERY, {
    top
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
  const { collections: lists, total } = data;
  const tableProps = {
    dataSource: lists,
    columns,
  };
  return (
    <div>
      <p className="total">总共有<span>{total}</span>本图书</p>
      <Table {...tableProps} />
    </div>
  );
}
