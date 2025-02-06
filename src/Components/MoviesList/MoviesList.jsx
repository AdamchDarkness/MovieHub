import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

function MoviesList({ type = "now_playing", nbrResultats = 6, page = 1 }) {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, nbrResultats));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchMovies();
  }, [type, nbrResultats, page]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movieId) => {
    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id) => id !== movieId);
    } else {
      updatedFavorites = [...favorites, movieId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark max-w-sm mx-auto"
        >
          <Link to={`/movie/${movie.id}`}>
            <img
              className="w-full h-45 object-cover mt-3 p-3"
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
          <div className="p-3 text-surface dark:text-white">
            <h5 className="mb-2 text-lg font-medium leading-tight p-1">
              {movie.title}
            </h5>
            <p className="mb-4 text-sm line-clamp-3 p-1">{movie.overview}</p>
            <Link to={`/movie/${movie.id}`}>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                View Details
              </button>
            </Link>
          </div>
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => toggleFavorite(movie.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={favorites.includes(movie.id) ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
