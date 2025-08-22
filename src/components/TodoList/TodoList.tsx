//import { getTodos } from '../../api';
//import { todo } from 'node:test';
import { Todo } from '../../types/Todo';
//import { Loader } from '../Loader/Loader';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onShow }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShow(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
