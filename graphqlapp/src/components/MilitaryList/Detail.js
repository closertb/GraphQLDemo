import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const USER_QUERY = gql`
query UserQuery($id: ID!){
  user(id:$id) {
    id,
    userName,
    age,
    military,
    height,
    education,
    enlistTime,
    enlistYear,
    userMixNick,
  }
}
`;

const withQuery = graphql(USER_QUERY, {
  options: (props) => {
    const { match: { params } } = props;
    return {
      variables: {
        id: params.id,
      },
    };
  },
});
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data: { loading, user } } = this.props;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    return (
      <div className="detail">
        <h2>详细资料</h2>
        <div>
          <span>姓名：{user.userName}</span>
          <span>年龄：{user.age}</span>
          <span>身高：{user.height}cm</span>
          <span>军衔：{user.military}</span>
          <span>学历：{user.education}</span>
          <span>入伍时间：{user.enlistTime}</span>
          <span>军龄：{user.enlistYear}年</span>
        </div>
      </div>
    );
  }
}

const Character = withQuery(Detail);
export default Character;
