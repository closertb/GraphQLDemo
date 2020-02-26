import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;
const Todo = ({ id, completed, text }) => (
  <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
    {toggleTodo => (
      <li
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        <a onClick={toggleTodo}>{text}</a>
      </li>
    )}
  </Mutation>
);

export default Todo;
