import { useState } from "react";

function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />
      <div className="card-content">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>
        <p>📅 {movie.release_date}</p>
        <button 
          onClick={() => setLiked(!liked)} 
          className={`like-btn ${liked ? 'liked' : 'unliked'}`}
        >
          {liked ? "♥ Liked" : "♡ Like"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
