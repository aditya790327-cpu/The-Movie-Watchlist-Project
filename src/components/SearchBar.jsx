import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={() => onSearch(query)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;