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
    const isDark = document.body.classList.contains('dark-mode') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches && !document.body.classList.contains('light-mode'));
                   
    if (isDark) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    }
  };

  const isDark = () => {
    if (typeof document === 'undefined') return false;
    return document.body.classList.contains('dark-mode') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches && !document.body.classList.contains('light-mode'));
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <div className="header-top">
        <h1><span className="emoji">🎬</span> Movie Explorer</h1>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDark() ? "☀️" : "🌙"} {isDark() ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="controls-container">
        <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />

        <select className="select-input" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By...</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
          <option value="rating">⭐ Top Rated</option>
        </select>

        <select className="select-input" value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))}>
          <option value="0">All Ratings</option>
          <option value="7">7+ Stars</option>
          <option value="8">8+ Stars</option>
        </select>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Discovering movies...</p>
        </div>
      )}

      {!loading && displayedMovies.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎭</div>
          <p className="empty-state-title">No movies found</p>
          <p className="empty-state-subtitle">Try adjusting your search or filters to discover more movies.</p>
        </div>
      )}

      {!loading && displayedMovies.length > 0 && (
        <div className="results-bar">
          <span className="results-count">
            Showing <strong>{displayedMovies.length}</strong> {displayedMovies.length === 1 ? 'movie' : 'movies'}
          </span>
          <span className="section-label">
            {searchQuery ? 'Search Results' : 'Popular Now'}
          </span>
        </div>
      )}

      <div className="grid">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <footer className="footer">
        <p>Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDB API</a> • Built with React + Vite</p>
      </footer>
    </div>
  );
}

export default Home;
