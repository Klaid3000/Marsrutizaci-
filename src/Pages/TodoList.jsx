import { useState } from 'react';
import SearchAndSort from '../components/SearchAndSort';
import NewTodoForm from '../components/NewTodoForm';
import TodoItem from '../components/TodoItem';
import '../App.css';
import useTodos from '../hooks/useTodos';

const TodoList = () => {
	const { todos, addTodo, updateTodo } = useTodos();
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
	<>
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
				todo={todo}
				updateTodo={updateTodo}
			/>
		))}
	</ul>
	</>
	)
}

export default TodoList;
