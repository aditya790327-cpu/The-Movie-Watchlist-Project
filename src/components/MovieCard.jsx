import { useState } from "react";

function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="netflix-card">
      <div className="netflix-card-image-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </div>
      <div className="netflix-card-details">
        <div className="netflix-card-actions">
          <div className="nf-actions-left">
            <button className="nf-btn-play" title="Play">▶</button>
            <button 
              onClick={() => setLiked(!liked)} 
              className={`nf-btn-action ${liked ? 'nf-liked' : ''}`}
              title={liked ? "Remove from My List" : "Add to My List"}
            >
              {liked ? "✓" : "+"}
            </button>
          </div>
          <button className="nf-btn-action more-info" title="More Info">˅</button>
        </div>
        <div className="netflix-card-meta">
          <span className="nf-match">{movie.vote_average ? (movie.vote_average * 10).toFixed(0) + '% Match' : 'New'}</span>
          <span className="nf-year">{movie.release_date?.split('-')[0] || ''}</span>
          <span className="nf-age">HD</span>
        </div>
        <h3 className="netflix-card-title" title={movie.title}>{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
