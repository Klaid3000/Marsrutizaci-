import { useParams } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import useEditing from '../hooks/useEditing';
import EditTodoForm from '../components/EditTodoForm';
import { useState } from 'react';

function TaskPage() {
	const { getTodo, todo, deleteTodo, updateTodo } = useTodos();
	const { id } = useParams();
	const { editingTodoId } = useEditing();
	const [isEditing, setIsEditing] = useState(false);
	const [todoTitle, setTodoTitle] = useState('');

	useEffect(() => {
		console.log(getTodo(id));
	}, [id]);

	const handleEditClick = () => {
		if (editingTodoId === null) {
			setIsEditing(true);
		}
	};

	const handleSaveTitle = (newTitle) => {
		setTodoTitle(newTitle);
	};

	if (!todo) {
		return <div className="span">Задача не найдена.</div>;
	}
	return (
		<>
			<div className="App">
				<div className="container">
					<h2>{todo.title}</h2>
					<h2>Изменено на: {todoTitle}</h2>
					<li>
						<button onClick={() => deleteTodo(todo.id)} className="delete">
							<Link to={'/'} className={'delete-back'}>
								Удалить
							</Link>
						</button>
						<button onClick={handleEditClick} className="edit">
							Изменить
						</button>
						<NavLink to={'/'} className={'back'}>
							Назад на главную
						</NavLink>
					</li>
					<div>
						{isEditing && (
							<EditTodoForm
								todo={todo}
								saveEditedTodo={updateTodo}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								handleSaveTitle={handleSaveTitle}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default TaskPage;
