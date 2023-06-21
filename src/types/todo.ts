interface ITodo {
  id: number;
  title: string;
}

export interface ITodoState {
  todos: ITodo[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum TodoActionTypes {
  FETCH_TODOS = "FETCH_TODOS",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR",
  SET_TODO_PAGE = "SET_TODO_PAGE",
  SET_TODO_LIMIT = "SET_TODO_LIMIT"
}

interface IFetchTodoAction {
  type: TodoActionTypes.FETCH_TODOS;
}

interface IFetchTodoSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: ITodo[];
}

interface IFetchTodoErrorAction {
  type: TodoActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}

interface ISetTodoPage {
  type: TodoActionTypes.SET_TODO_PAGE;
  payload: number;
}

interface ISetTodoLimit {
  type: TodoActionTypes.SET_TODO_LIMIT;
  payload: number;
}

export type TodoAction =
  IFetchTodoAction |
  IFetchTodoSuccessAction |
  IFetchTodoErrorAction |
  ISetTodoPage |
  ISetTodoLimit
