import React, {useEffect, useState} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import {useActions} from "../hooks/useActions";

const maxLimitLength = 200; // Max length of todos

const TodoList: React.FC = () => {
  const {
    page,
    error,
    loading,
    todos,
    limit
  } = useTypesSelector(state => state.todo);

  const {
    fetchTodos,
    setTodoPage,
    setTodoLimit
  } = useActions();

  const [pages, setPages] = useState(
    (new Array(Math.ceil(maxLimitLength / limit))).fill(1).map((a, i) => i + 1)
  );

  const [limitTodos, setLimitTodos] = useState("10");

  const limits = [1, 5, 10, 20, 50, 100, 200, 500, 1000].filter(n => n <= maxLimitLength);
  if(!limits.includes(maxLimitLength)) {
    limits.push(maxLimitLength);
  }

  const limitChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTodoLimit(Number(value));
    setLimitTodos(value);
    setTodoPage(1);
    setPages(
      (new Array(Math.ceil(maxLimitLength / Number(value))))
        .fill(1)
        .map((a, i) => i + 1)
    );
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
                <div style={{marginBottom: 10, fontWeight: 900}}>
                  <span>Отображать дела по:&nbsp;</span>

                  <select
                    value={limitTodos}
                    onChange={(event) => limitChangeHandler(event)}
                    style={{fontWeight: 900, paddingLeft: 5, paddingRight: 5}}
                  >
                    {limits.map(val => {
                      return (
                        <option key={val} value={val}>{val}</option>
                      );
                    })}
                  </select>

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
