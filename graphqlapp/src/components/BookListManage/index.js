import React, { useState } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import TabBar from './TabBar';
import Content from './Content';

// const GET_STATUS = gql`
//   query book{
//     top @client
//   }
// `;

const BookList = () => {
  console.log('update index');
  // const { data = {} } = useQuery(GET_STATUS);
  // const { top } = data;
  const [top, setTop] = useState(20);
  const [self, setSelf] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setSelf(!self)}>切换</button>
      <TabBar top={top} callback={setTop} />
      <Content top={top} />
    </div>
  );
};
export default BookList;
