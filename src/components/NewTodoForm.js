import { useState } from 'react';

function NewTodoForm({ addTodo }) {
	const [newTodoText, setNewTodoText] = useState('');

	const handleAddTodo = () => {
		if (newTodoText.trim() !== '') {
			addTodo(newTodoText);
			setNewTodoText('');
		}
	};

	return (
		<div className="add-todo">
			<input
				type="text"
				placeholder="Новая задача..."
				value={newTodoText}
				onChange={(e) => setNewTodoText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleAddTodo();
					}
				}}
			/>
			<button onClick={handleAddTodo}>Добавить</button>
		</div>
	);
}

export default NewTodoForm;
