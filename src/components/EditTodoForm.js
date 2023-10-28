import { useState } from 'react';

function EditTodoForm({
	todo,
	saveEditedTodo,
	isEditing,
	setIsEditing,
	handleSaveTitle,
}) {
	const [editingTodoText, setEditingTodoText] = useState(todo.title);

	const handleSaveEditedTodo = () => {
		if (editingTodoText.trim() !== '') {
			saveEditedTodo(todo.id, { title: editingTodoText });
			setIsEditing(false);
			handleSaveTitle(editingTodoText);
		}
	};

	const handleCancelEditing = () => {
		setIsEditing(false);
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
			<button onClick={handleCancelEditing}>Отмена</button>
		</div>
	);
}

export default EditTodoForm;
