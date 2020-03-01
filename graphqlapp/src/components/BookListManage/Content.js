import React, { memo } from 'react';
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
  query list($top: Int){
    collections(top: $top) {
      total
      collections {
        book_id
        title
        image
      }
    }
  }
`;

function BookList(props) {
  const { top } = props;
  const { loading, error, data = {} } = useQuery(BOOKS_QUERY, {
    variables: {
      top: +top
    }
  });
  console.log('update list A', loading);
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
  const { collections: lists = [], total } = data.collections;
  const tableProps = {
    dataSource: lists,
    rowKey: 'book_id',
    columns,
  };
  return (
    <div>
      <p className="total">总共有<span>{total}</span>本图书</p>
      <Table {...tableProps} />
    </div>
  );
}
// console.log('top:', pre.top, next.top, pre.top === next.top);
// 只有在top变化时，更新组件；第二个比较条件，只适合在有深比较时有必要写，像这里，写与不写作用一样，
// memo默认会对props做浅比较；(pre, next) => pre.top === next.top
export default memo(BookList);
