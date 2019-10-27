import React, { Component } from 'react';
import { graphql } from 'react-apollo';
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
  query($status: String){
    collections(status: $status) {
      total
      collections {
        book_id
        title
        image
      }
    }
  }
`;

const withQuery = graphql(BOOKS_QUERY, {
  options: ({ status }) => ({
    variables: {
      status,
    },
  }),
});
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data: { loading, collections } } = this.props;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    const { collections: lists, total } = collections;
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
}
const Content = withQuery(BookList);
export default Content;
