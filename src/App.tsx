/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
//import { use } from 'chai';
//import { todo } from 'node:test';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

import users from '../public/api/users.json';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleShowTodo = (todo: Todo) => {
    const user = users.find(u => u.id === todo.userId);

    setSelectedTodo({ ...todo, user });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const todosFromApi = await getTodos();

        setTodos(todosFromApi);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
        // eslint-disable-next-line no-console
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList todos={todos} onShow={handleShowTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={selectedTodo}
      />
    </>
  );
};
