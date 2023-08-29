function TodoItem({ todo, updateTodo, deleteTodo, editTodo }) {
	return (
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
			{todo.title}
			<button onClick={() => deleteTodo(todo.id)} className="delete">
				Удалить
			</button>
			<button onClick={() => editTodo(todo.id)} className="edit">
				Изменить
			</button>
		</li>
	);
}

export default TodoItem;
