import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import TabBar from './TabBar';
import Content from './Content';

const GET_STATUS = gql`
  {
    top @client
  }
`;

const BookList = () => (
  <Query query={GET_STATUS}>
    {({ data = {} }) => {
      const { top } = data;
      console.log('top:', top);
      return (
        <div>
          <TabBar top={top} />
          <Content top={top} />
        </div>
      );
    }}
  </Query>
);
export default BookList;
