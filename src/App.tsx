import React from 'react';
import UserList from "./components/UserList";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <h1>Списки пользователей и дел!</h1>
      <hr />
      <UserList />
      <hr />
      <TodoList />
    </div>
  );
};

export default App;
