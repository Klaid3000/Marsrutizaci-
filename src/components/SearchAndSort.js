function SearchAndSort({ searchText, handleSearch, sortAlphabetically, toggleSort }) {
	return (
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
	);
}

export default SearchAndSort;
