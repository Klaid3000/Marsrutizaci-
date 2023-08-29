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

import { useState } from 'react';
import SearchAndSort from './components/SearchAndSort';
import NewTodoForm from './components/NewTodoForm';
import TodoItem from './components/TodoItem';
import EditTodoForm from './components/EditTodoForm';
import './App.css';
import useTodos from './hooks/useTodos';
import useEditing from './hooks/useEditing';

function App() {
	const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
	const { editingTodoId, startEditing, finishEditing } = useEditing();
	const [searchText, setSearchText] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState(false);

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
				<SearchAndSort
					searchText={searchText}
					handleSearch={handleSearch}
					sortAlphabetically={sortAlphabetically}
					toggleSort={toggleSort}
				/>
				<NewTodoForm addTodo={addTodo} />
				<ul>
					{filteredTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
							editTodo={startEditing}
						/>
					))}
				</ul>
				{editingTodoId !== null && (
					<EditTodoForm
						todo={todos.find((todo) => todo.id === editingTodoId)}
						saveEditedTodo={updateTodo}
						cancelEditing={finishEditing}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
