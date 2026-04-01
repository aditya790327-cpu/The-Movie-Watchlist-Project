function MovieCard({ movie }) {
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <p>{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
