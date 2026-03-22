import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTodosApi,
  addTodoApi,
  toggleTodoApi,
  deleteTodoApi,
} from './todosApi';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  return await fetchTodosApi();
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  return await addTodoApi(text);
});

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async ({ id, completed }) => {
    return await toggleTodoApi(id, completed);
  }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  return await deleteTodoApi(id);
});
