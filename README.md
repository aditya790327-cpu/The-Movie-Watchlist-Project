# 🎬 Movie Explorer

A sleek, responsive movie discovery app built with **React + Vite**, powered by the **TMDB API**. Browse popular films, live-search the entire TMDB catalog, and filter/sort results — all with a premium dark/light mode UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Live Search** | Real-time debounced search against the TMDB database as you type |
| 🎯 **Filter by Rating** | Instantly filter results by minimum rating (7+ or 8+ stars) |
| 🔤 **Sort** | Sort movies alphabetically (A→Z / Z→A) or by top rated |
| 🌗 **Dark / Light Mode** | Toggle between themes; respects OS preference by default |
| 🃏 **Netflix-style Cards** | Hover-reveal overlay with match %, year, and action buttons |
| ⚡ **Staggered Animations** | Cards fade-in with cascading delay for a polished feel |
| 📱 **Fully Responsive** | Optimized grid layout from mobile (2-col) to desktop (5-col) |

---

## 🛠 Tech Stack

- **Framework:** React 19 (Hooks, functional components)
- **Bundler:** Vite 8
- **API:** [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)
- **Styling:** Vanilla CSS with CSS custom properties (light/dark tokens)
- **Font:** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx      # Netflix-style card with hover overlay
│   └── SearchBar.jsx      # Controlled search input
├── pages/
│   └── Home.jsx           # Main page: search, filter, sort, grid
├── App.jsx                # Root component (imports App.css)
├── App.css                # All component/layout styles
├── index.css              # Design system tokens, resets, typography
└── main.jsx               # React DOM entry point
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/<your-username>/The-Movie-Watchlist-Project.git
cd The-Movie-Watchlist-Project
npm install
```

### 2. Get a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API** and copy your **API Key (v3 auth)**

### 3. Configure Environment

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

The output is in the `dist/` folder, ready for deployment.

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push the repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `VITE_TMDB_API_KEY` in **Settings → Environment Variables**
4. Deploy — Vite projects are auto-detected

### Netlify / Other

Any static host works. Set the **build command** to `npm run build` and the **publish directory** to `dist`.

---

## 🧩 Key Implementation Details

### Higher-Order Array Functions

The app exclusively uses HOFs (no loops) for data manipulation:

- **`filter()`** — live local search + minimum rating filtering
- **`sort()`** — alphabetical and rating-based sorting
- **`map()`** — rendering the movie card grid

### Debounced API Calls

Search input uses a 300ms debounce via `setTimeout` + cleanup in `useEffect` to avoid excessive API requests while typing.

### CSS Architecture

- **Design tokens** in `index.css` (`:root` and `.dark-mode` variables)
- **Component styles** in `App.css` with BEM-inspired naming
- **Responsive breakpoints** at 640px and 1024px
- **Staggered `@keyframes`** on card mount for entrance animations

---

## 🎓 Learning Outcomes

- React Hooks (`useState`, `useEffect`) and derived state patterns
- REST API integration with `fetch` and `async/await`
- Debouncing techniques for performant live search
- Higher-order array functions (`filter`, `sort`, `map`)
- CSS custom properties for theming (dark/light mode)
- Responsive CSS Grid layouts
- Component composition and separation of concerns

---

## 📅 Milestones

| Milestone | Date | Status |
|---|---|---|
| M1 — Setup & Planning | 23 Mar | ✅ |
| M2 — API Integration | 1 Apr | ✅ |
| M3 — Core Features (Search, Filter, Sort) | 8 Apr | ✅ |
| M4 — UI Polish & Deploy | 10 Apr | ✅ |

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React + Vite &nbsp;•&nbsp; Powered by <a href="https://www.themoviedb.org">TMDB</a>
</p>