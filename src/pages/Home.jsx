import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (query) => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>🎬 Movie Explorer</h1>

      <SearchBar onSearch={searchMovies} />

      {loading && <p>Loading...</p>}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
