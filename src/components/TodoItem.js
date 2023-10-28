import { NavLink } from 'react-router-dom';

function TodoItem({ todo, updateTodo }) {
	return (
		<>
			<li key={todo.id}>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() =>
						updateTodo(todo.id, {
							...todo,
							completed: !todo.completed,
						})
					}
				/>
				<NavLink to={`/task/${todo.id}`}>
					<div className="todo-text" key={todo.id}>
						{todo.title}
					</div>
				</NavLink>
			</li>
		</>
	);
}

export default TodoItem;
