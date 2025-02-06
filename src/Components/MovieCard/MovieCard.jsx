import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieCard() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]); 
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`
        );
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 5)); 
      } catch (error) {
        console.error("Erreur lors de la récupération des films similaires :", error);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 10)); 
      } catch (error) {
        console.error("Erreur lors de la récupération du cast :", error);
      }
    };

    fetchMovie();
    fetchSimilarMovies();
    fetchCast();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.includes(parseInt(id)));
  }, [id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((favId) => favId !== parseInt(id));
    } else {
      updatedFavorites = [...storedFavorites, parseInt(id)];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!movie) {
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      <br /><br /><br />
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />

        <div className="p-6 md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{movie.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{movie.overview}</p>

     
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
          </div>

          <button
            onClick={toggleFavorite}
            className={`px-6 py-2 rounded-lg font-medium text-lg transition-colors ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

  
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden text-center"
            >
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${actor.profile_path}`
                    : "https://via.placeholder.com/500x750" 
                }
                alt={actor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h3 className="text-md font-medium text-gray-800 dark:text-white">{actor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Similar Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {similarMovies.map((similarMovie) => (
            <div
              key={similarMovie.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden"
            >
              <img
                src={`${IMAGE_BASE_URL}${similarMovie.poster_path}`}
                alt={similarMovie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-800 dark:text-white">
                  {similarMovie.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rating: {similarMovie.vote_average} / 10
                </p>
                <Link
                  to={`/movie/${similarMovie.id}`}
                  className="block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
