function SearchBar({ query, onQueryChange, onSearch, isLoading }) {
  const trimmedQuery = query.trim();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && trimmedQuery) {
            onSearch();
          }
        }}
      />

      <button
        className="primary-button"
        onClick={onSearch}
        disabled={!trimmedQuery || isLoading}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
