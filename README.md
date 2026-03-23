# 🎬 Movie Watchlist Project

A sleek and interactive movie search and watchlist app that allows users to discover movies and curate their own personal watchlist in real time.

## ✨ Core Features

### 🔍 Live Movie Search
- Search movies using the **OMDb API**
- Fetch results dynamically as the user types or on search click
- Fast and responsive results display

### 🎯 Watchlist Toggle
- Add or remove movies from your watchlist with a single click
- Instant UI updates for smooth user experience

### 📭 Empty States
- Clean UI when:
  - No movies are found
  - Watchlist is empty

### 🎨 Modern UI
- Dark theme inspired by **Disney+ / HBO Max**
- Sticky sidebar for saved movies
- Smooth and intuitive layout

### 🎲 Optional Feature
- **Random Movie Night**
  - Picks a random movie from your watchlist
  - Perfect for indecisive days 😄

---

## 🌐 APIs Used

- 🎥 **OMDb API**  
  https://www.omdbapi.com/

- 🍿 **TMDB API** (for extended data - optional)  
  https://developer.themoviedb.org/docs/getting-started

- 📺 **Watchmode API** (for streaming availability - optional)  
  https://api.watchmode.com/

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Styling:** CSS / Tailwind CSS (update if needed)
- **State Management:** React Hooks (useState, useEffect)

---

## 📂 Project Structure
The-Movie-Watchlist-Project/
│
├── node_modules/          # Installed dependencies
├── public/                # Static assets
│
├── src/                   # Main source code
│   ├── assets/            # Images / icons
│   ├── App.jsx            # Root component
│   ├── App.css            # App styles
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
│
├── .gitignore             # Files ignored by git
├── index.html             # HTML template
├── package.json           # Project metadata & scripts
├── package-lock.json      # Dependency lock file
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint config
├── README.md              # Project documentation