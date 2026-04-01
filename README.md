🎬 Movie Watchlist App
A web application to search movies, save them to a watchlist, and manage them with real-time updates.
🎯 Features

Search Movies: Search TMDB database for any movie
Add to Watchlist: Save movies to personal watchlist (real-time sync)
Filter by Rating: Filter watchlist by minimum rating
Sort by Rating: Sort movies by rating (high to low)
Random Movie: Pick a random movie from watchlist
Sticky Sidebar: Always visible watchlist while searching
Real-time Updates: Changes sync instantly across tabs

🛠 Tech Stack

Frontend: React + React Router
Database: Supabase (PostgreSQL)
API: TMDB (The Movie Database)
Hosting: Vercel
Styling: CSS (simple, no framework)

📋 Project Structure
src/
├── components/
│   ├── SearchBar.jsx
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   ├── WatchlistSidebar.jsx
│   ├── RatingFilter.jsx
│   └── LoadingSpinner.jsx
├── pages/
│   ├── Home.jsx
│   └── Watchlist.jsx
├── services/
│   ├── tmdbService.js
│   └── supabaseService.js
├── hooks/
│   ├── useWatchlist.js
│   └── useMovies.js
├── config/
│   └── supabaseClient.js
├── App.jsx
└── App.css
🚀 Setup Instructions
1. Clone & Install
bashgit clone <your-repo>
cd movie-watchlist
npm install @supabase/supabase-js react-router-dom
2. Environment Variables
Create .env.local:
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
3. Get API Keys

Supabase: https://supabase.com → Create project → Copy keys
TMDB: https://www.themoviedb.org/settings/api → Get API key

4. Supabase Setup
In Supabase SQL Editor, run:
sqlCREATE TABLE watchlist (
  id BIGSERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  poster_url TEXT,
  release_date TEXT,
  overview TEXT,
  rating NUMERIC(3,1),
  genres TEXT,
  runtime INTEGER,
  director TEXT,
  cast TEXT,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER PUBLICATION supabase_realtime ADD TABLE watchlist;
Enable RLS + allow public access.
5. Run Locally
bashnpm start
📲 Deployment (Vercel)

Push to GitHub
Connect repo to Vercel
Add environment variables in Vercel dashboard
Deploy

🎓 Learning Outcomes

React Hooks (useState, useEffect, custom hooks)
API integration (fetch, async/await)
Array methods (filter, sort, map)
React Router for navigation
Real-time database synchronization
State management

📅 Milestones

M1 (23 Mar): Setup & Planning ✓
M2 (1 Apr): API Integration
M3 (8 Apr): Core Features
M4 (10 Apr): Deploy & Finalize

⚠️ Notes

No backend server - Supabase handles all DB operations
Real-time updates via Supabase listeners
Array HOFs required for filtering/sorting (no loops)
Shared watchlist - all users see the same data