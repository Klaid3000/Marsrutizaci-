import { useState } from 'react';

function useEditing() {
	const [editingTodoId, setEditingTodoId] = useState(null);

	const startEditing = (id) => {
		setEditingTodoId(id);
	};

	const finishEditing = () => {
		setEditingTodoId(null);
	};

	return {
		editingTodoId,
		startEditing,
		finishEditing,
	};
}

export default useEditing;
