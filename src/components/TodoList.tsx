import React, {useEffect, useState} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import {useActions} from "../hooks/useActions";

const TodoList: React.FC = () => {
  const {page, error, loading, todos, limit} = useTypesSelector(state => state.todo);
  const {fetchTodos, setTodoPage, setTodoLimit} = useActions();
  const [pages, setPages] = useState(
    (new Array(Math.round(200 / limit))).fill(1).map((a, i) => i + 1)
  );
  const [limitTodos, setLimitTodos] = useState(10);

  const limitChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(Number(event.target.value));
    if (value > 200) {
      setTodoLimit(200);
      setLimitTodos(200);
      setTodoPage(1);
      setPages([1]);
    } else if (value < 1) {
      setTodoLimit(1);
      setLimitTodos(1);
      setTodoPage(1);
      setPages((new Array(200)).fill(1).map((a, i) => i + 1));
    } else {
      setTodoLimit(value);
      setLimitTodos(value);
      setTodoPage(1);
      setPages((new Array(Math.ceil(200 / value))).fill(1).map((a, i) => i + 1))
    }
  };

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page, limit]);

  if (loading) {
    return (<h2>Идёт загрузка дел...</h2>);
  }

  if (error) {
    return (<h2>{error}</h2>);
  }

  return (
    <>
      <h2>Список дел:</h2>
      {
        loading
          ? <h2>Идёт загрузка дел...</h2>
          : error
            ? <h2>{error}</h2>
            : <div>
                <div style={{marginBottom: 10}}>
                  <span>Отображать дела по:&nbsp;</span>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={limitTodos}
                    onChange={(event) => limitChangeHandler(event)}
                    style={{width: 50}}
                  />
                  <span>&nbsp;на странице.</span>
                </div>
                {todos.map(todo => {
                  return (<div key={todo.id}>{todo.id} - {todo.title}</div>);
                })}
                <h3>Страницы с делами:</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                  {pages.map(p => {
                    return (
                      <div
                        key={p}
                        onClick={() => setTodoPage(p)}
                        style={{border: p === page ? "2px solid green" : "1px solid gray", padding: 10}}
                      >
                        {p}
                      </div>
                    );
                  })}
                </div>
              </div>
      }
    </>
  );
};

export default TodoList;
