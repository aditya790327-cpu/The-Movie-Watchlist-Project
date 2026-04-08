import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const getReleaseDateTimestamp = (value) => {
  const parsed = Date.parse(value ?? "");
  return Number.isNaN(parsed) ? 0 : parsed;
};

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minRating, setMinRating] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchMovies = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${trimmedQuery}`
      );
      const data = await res.json();
      setMovies(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  const normalizedQuery = useMemo(
    () => query.trim().toLowerCase(),
    [query]
  );

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        if (!normalizedQuery) return true;
        const searchableText =
          `${movie.title ?? ""} ${movie.overview ?? ""}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .filter((movie) => {
        if (minRating === "all") return true;
        const ratingValue = Number(movie.vote_average ?? 0);
        return ratingValue >= Number(minRating);
      });
  }, [movies, normalizedQuery, minRating]);

  const visibleMovies = useMemo(() => {
    if (sortOption === "default") {
      return filteredMovies;
    }

    return [...filteredMovies].sort((a, b) => {
      if (sortOption === "rating-desc") {
        return Number(b.vote_average ?? 0) - Number(a.vote_average ?? 0);
      }
      if (sortOption === "rating-asc") {
        return Number(a.vote_average ?? 0) - Number(b.vote_average ?? 0);
      }
      if (sortOption === "title-asc") {
        return (a.title ?? "").localeCompare(b.title ?? "");
      }
      if (sortOption === "title-desc") {
        return (b.title ?? "").localeCompare(a.title ?? "");
      }
      if (sortOption === "date-desc") {
        return (
          getReleaseDateTimestamp(b.release_date) -
          getReleaseDateTimestamp(a.release_date)
        );
      }
      if (sortOption === "date-asc") {
        return (
          getReleaseDateTimestamp(a.release_date) -
          getReleaseDateTimestamp(b.release_date)
        );
      }
      return 0;
    });
  }, [filteredMovies, sortOption]);

  return (
    <div className="app" data-theme={isDarkMode ? "dark" : "light"}>
      <header className="header">
        <div className="title-row">
          <h1>🎬 Movie Explorer</h1>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchMovies}
          isLoading={loading}
        />

        <div className="controls">
          <label className="control">
            <span>Filter by rating</span>
            <select
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
            >
              <option value="all">All ratings</option>
              <option value="5">5+ ⭐</option>
              <option value="7">7+ ⭐</option>
              <option value="8">8+ ⭐</option>
            </select>
          </label>

          <label className="control">
            <span>Sort results</span>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="title-asc">Title: A → Z</option>
              <option value="title-desc">Title: Z → A</option>
              <option value="date-desc">Release: Newest</option>
              <option value="date-asc">Release: Oldest</option>
            </select>
          </label>
        </div>
      </header>

      {loading && <p className="status">Loading...</p>}

      {!loading && movies.length === 0 && (
        <p className="status">Search for a movie to get started.</p>
      )}

      {!loading && movies.length > 0 && (
        <p className="status">
          Showing {visibleMovies.length} of {movies.length} results
        </p>
      )}

      {!loading && movies.length > 0 && visibleMovies.length === 0 && (
        <p className="status">No movies match your search and filters.</p>
      )}

      <div className="grid">
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
