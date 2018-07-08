import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
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
      }
    }
  }
`;
const withQuery = graphql(USERS_QUERY, {
  options: () => ({
    variables: {
      pageNum: 3,
      pageSize: 8
    },
  }),
});
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data: { loading, users } } = this.props;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    const { data: lists, total } = users;
    return (
      <div>
        <p className="total">总共有<span>{total}</span>名军士</p>
        <ul className="list">
          {
            lists.map(({ userName, id }, key) =>
              <li key={key}>
                <span>姓名：{userName}</span>
                <Link to={`/${id}/detail`} >详情</Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
const Character = withQuery(List);
export default Character;
