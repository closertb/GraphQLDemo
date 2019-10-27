import React, { Component } from 'react';
import { Query } from 'react-apollo';
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

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { status } = this.props;
    const mock = { total: 0, collections: [] };
    return (
      <Query query={BOOKS_QUERY} variables={{ status }}>
        {({ loading, error, data }) => {
          const { collections: lists, total } = mock;
          const tableProps = {
            dataSource: lists,
            columns,
            rowKey: 'book_id',
          };
          return (
            <div>
              <p className="total">总共有<span>{total}</span>本图书</p>
              <Table {...tableProps} />
            </div>
          );
        }}
      </Query>
    );
  }
}