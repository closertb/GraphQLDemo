import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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

export default function Detail(props) {
  const { match: { params } } = props;
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      id: params.id,
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
  const { user } = data;
  return (
    <div className="detail">
      <h2>详细资料</h2>
      <div>
        <p>
          <span>姓名：{user.userName}</span>
          <span>年龄：{user.age}</span>
          <span>身高：{user.height}cm</span>
          <span>军衔：{user.military}</span>
        </p>
        <p>
          <span>学历：{user.education}</span>
          <span>入伍时间：{user.enlistTime}</span>
          <span>军龄：{user.enlistYear}年</span>
        </p>
      </div>
    </div>
  );
}
