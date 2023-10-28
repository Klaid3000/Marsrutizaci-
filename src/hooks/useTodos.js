import { useState, useEffect } from 'react';

function useTodos() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState(null);

	useEffect(() => {
		fetch('http://localhost:5000/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const addTodo = (title) => {
		const newTodo = { title, completed: false };
		fetch('http://localhost:5000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTodo),
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos([...todos, data]);
			})
			.catch((error) => console.error('Error adding todo:', error));
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

	const getTodo = (id) => {
		fetch(`http://localhost:5000/todos/${id}`)
			.then((item) => {
				return item.json();
			})
			.then((todo) => {
				setTodo(todo);
			})
			.catch((error) => console.error('Error deleting todo:', error));
	};
	return {
		todos,
		addTodo,
		updateTodo,
		deleteTodo,
		getTodo,
		todo,
	};
}

export default useTodos;
