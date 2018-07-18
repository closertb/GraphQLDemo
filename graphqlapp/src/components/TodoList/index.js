import React from 'react';
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => (
  <div>
    <TodoForm />
    <TodoList />
    <Footer />
  </div>
);
export default Todo;