import { useState } from 'react';
import './App.css';
import useTodos from './hooks/useTodos';
import TodoList from './Pages/TodoList';

function App() {
	const { todos } = useTodos();
	const [sortAlphabetically] = useState(false);

	const sortedTodos = [...todos];
	if (sortAlphabetically) {
		sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}
	return (
		<div className="App">
			<div className="container">
				<TodoList />
			</div>
		</div>
	);
}

export default App;
