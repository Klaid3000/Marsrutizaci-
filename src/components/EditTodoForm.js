import { useState } from 'react';

function EditTodoForm({ todo, saveEditedTodo, cancelEditing }) {
	const [editingTodoText, setEditingTodoText] = useState(todo.title);

	const handleSaveEditedTodo = () => {
		if (editingTodoText.trim() !== '') {
			saveEditedTodo(todo.id, { title: editingTodoText }); // Обновляем только название задачи
			cancelEditing();
		}
	};

	return (
		<div className="edit-todo">
			<input
				type="text"
				placeholder="Внесите изменения..."
				value={editingTodoText}
				onChange={(e) => setEditingTodoText(e.target.value)}
			/>
			<button onClick={handleSaveEditedTodo}>Сохранить изменения</button>
			<button onClick={cancelEditing}>Отмена</button>
		</div>
	);
}

export default EditTodoForm;
