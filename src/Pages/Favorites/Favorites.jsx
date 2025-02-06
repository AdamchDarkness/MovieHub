import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      try {
        const moviePromises = favoriteIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`
          ).then((response) => response.json())
        );

        const movies = await Promise.all(moviePromises);
        setFavoriteMovies(movies);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };

    fetchFavorites();
  }, []);

  // Fonction pour retirer un film des favoris
  const removeFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedStoredFavorites = storedFavorites.filter((id) => id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(updatedStoredFavorites));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Favorites</h1>

      {/* Message si aucun favori */}
      {favoriteMovies.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {favoriteMovies.map((movie) => (
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
                <p className="mb-4 text-sm line-clamp-3 p-1">
                  {movie.overview}
                </p>
              <Link to={`/movie/${movie.id}`}>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                View Details
              </button>
            </Link>
            </div>
              {/* Icône de cœur cliquable */}
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => removeFavorite(movie.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500 hover:scale-110 transition-transform"
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
      )}
    </div>
  );
}

export default Favorites;
