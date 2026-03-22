import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import TodoList from './componets/TodoList';
import TodoEditor from './componets/TodoEditor';
import Filter from './componets/Filter';
import Info from './componets/Info';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from './store/todosSlice';

export default function App() {
  const dispatch = useDispatch();
  const { items: todos, status, error } = useSelector((state) => state.todos);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(filter.toLowerCase())
    );
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.completed).length;

  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };

  const handleToggle = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    dispatch(toggleTodo({ id, completed: todo.completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>Завдання</h1>
      <Info total={todos.length} completed={completedCount} />
      <Filter value={filter} onChange={setFilter} />
      <TodoEditor onAdd={handleAdd} />
      {status === 'loading' && <p>Завантаження…</p>}
      {status === 'failed' && (
        <p style={{ color: 'red' }}>Помилка: {error}</p>
      )}
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
