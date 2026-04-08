import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [filterRating, setFilterRating] = useState(0);

  // Live real-time search hitting TMDB Database automatically as the query updates
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        if (searchQuery.trim().length > 0) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    // 300ms debounce ensures it waits for you to pause typing or deleting before fetching
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Derived state to apply Higher Order Functions synchronously
  let displayedMovies = [...movies];

  // Higher-order function: filter (Searching locally in tandem)
  if (searchQuery) {
    displayedMovies = displayedMovies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Higher-order function: filter (Filtering by top rating criterion exclusively)
  if (filterRating > 0) {
    displayedMovies = displayedMovies.filter((m) => m.vote_average >= filterRating);
  }
  
  // Higher-order function: sort (Sorting)
  if (sortOrder === "asc") {
    displayedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    displayedMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOrder === "rating") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <div className="header-top">
        <h1>🎬 Movie Explorer</h1>
        <button className="theme-toggle" onClick={toggleDarkMode}>🌓 Toggle Theme</button>
      </div>

      <div className="controls-container">
        <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />

        <select className="select-input" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By...</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="rating">Top Rated</option>
        </select>

        <select className="select-input" value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))}>
          <option value="0">All Ratings</option>
          <option value="7">7+ Stars / 10</option>
          <option value="8">8+ Stars / 10</option>
        </select>
      </div>

      {loading && <p>Loading massive blockbusters...</p>}

      {!loading && displayedMovies.length === 0 && (
        <p>No movies matched your current filters. Try searching for something else!</p>
      )}

      <div className="grid">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
