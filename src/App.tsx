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

//import users from '../public/api/users.json';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  /* eslint-disable */
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  /* eslint-disable */

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleShowTodo = async (todo: Todo) => {
    setIsModalOpen(true);
    setSelectedTodo({ ...todo, user: undefined }); // mostra loader

    try {
      const user = await getUser(todo.userId);

      setSelectedTodo({ ...todo, user });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user:', error);
    }
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
              <TodoFilter
                status={statusFilter}
                query={searchQuery}
                onStatusChange={setStatusFilter}
                onQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList todos={filteredTodos} onShow={handleShowTodo} />
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
