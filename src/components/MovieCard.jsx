function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";
  const posterAltText = movie.title
    ? `${movie.title} poster`
    : movie.id
      ? `Movie poster (ID: ${movie.id})`
      : "Movie poster (no title available)";

  return (
    <div className={`card ${isFavorite ? "favorite" : ""}`}>
      {posterUrl ? (
        <img src={posterUrl} alt={posterAltText} />
      ) : (
        <div className="poster-placeholder">No poster</div>
      )}
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
      <p>{movie.release_date || "Release date unknown"}</p>
      <button
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        type="button"
        onClick={() => onToggleFavorite(movie.id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "★ Favorited" : "☆ Favorite"}
      </button>
    </div>
  );
}

export default MovieCard;
