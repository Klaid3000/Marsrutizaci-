// import { useState, useEffect } from 'react';
// import './App.css';

// function App() {
// 	const [todos, setTodos] = useState([]);

// 	useEffect(() => {
// 		fetch('https://jsonplaceholder.typicode.com/todos')
// 			.then((response) => response.json())
// 			.then((data) => setTodos(data));
// 	}, []);

// 	return (
// 		<div className="App">
// 			<h1>Список задач</h1>
// 			<ul>
// 				{todos.map((todo) => (
// 					<li key={todo.id}>{todo.title}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// export default App;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodoText, setNewTodoText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');

	const saveEditedTodo = (id) => {
		if (editingTodoText.trim() !== '') {
			const updatedTodo = { title: editingTodoText };
			updateTodo(id, updatedTodo);
			setEditingTodoId(null);
			setEditingTodoText('');
		}
	};

	const cancelEditing = () => {
		setEditingTodoId(null);
		setEditingTodoText('');
	};

	useEffect(() => {
		fetch('http://localhost:5000/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const addTodo = () => {
		if (newTodoText.trim() !== '') {
			const newTodo = { title: newTodoText, completed: false };
			fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTodo),
			})
				.then((response) => response.json())
				.then((data) => {
					setTodos([...todos, data]);
					setNewTodoText('');
				})
				.catch((error) => console.error('Error adding todo:', error));
		}
	};

	const updateTodo = (id, updatedTodo) => {
		fetch(`http://localhost:5000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedTodo),
		})
			.then((response) => response.json())
			.then((data) => {
				const updatedTodos = todos.map((todo) => (todo.id === id ? data : todo));
				setTodos(updatedTodos);
			})
			.catch((error) => console.error('Error updating todo:', error));
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:5000/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				const updatedTodos = todos.filter((todo) => todo.id !== id);
				setTodos(updatedTodos);
			})
			.catch((error) => console.error('Error deleting todo:', error));
	};

	const handleSearch = (event) => {
		setSearchText(event.target.value);
	};

	const toggleSort = () => {
		setSortAlphabetically(!sortAlphabetically);
	};

	const sortedTodos = [...todos];
	if (sortAlphabetically) {
		sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}

	const filteredTodos = sortedTodos.filter((todo) =>
		todo.title.toLowerCase().includes(searchText.toLowerCase()),
	);

	return (
		<div className="App">
			<div className="container">
				<h1>Список задач</h1>
				<div className="controls">
					<input
						type="text"
						placeholder="Поиск по фразе..."
						value={searchText}
						onChange={handleSearch}
					/>
					<button onClick={toggleSort}>
						{sortAlphabetically
							? 'Отключить сортировку по алфавиту'
							: 'Сортировать по алфавиту'}
					</button>
				</div>
				<div className="add-todo">
					<input
						type="text"
						placeholder="Новая задача..."
						value={newTodoText}
						onChange={(e) => setNewTodoText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addTodo();
							}
						}}
					/>
					<button onClick={addTodo}>Добавить</button>
				</div>
				<ul>
					{filteredTodos.map((todo) => (
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
							<button
								onClick={() => deleteTodo(todo.id)}
								className="delete"
							>
								Удалить
							</button>
							<button
								onClick={() => setEditingTodoId(todo.id)}
								className="edit"
							>
								Изменить
							</button>
							{editingTodoId === todo.id && (
								<div className="edit-todo">
									<input
										type="text"
										placeholder="Внесите изменения..."
										value={editingTodoText}
										onChange={(e) =>
											setEditingTodoText(e.target.value)
										}
									/>
									<button onClick={() => saveEditedTodo(todo.id)}>
										Сохранить изменения
									</button>
									<button onClick={() => cancelEditing()}>
										Отмена
									</button>
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
