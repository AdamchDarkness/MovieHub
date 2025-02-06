import React, { useState, useEffect } from "react";
import PaginatedMovies from "../../Components/PaginatedMovies/PaginatedMovies";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc"); 
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();


  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setSearchHistory(history);
    setFavorites(storedFavorites);
  }, []);


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || []))
      .catch((error) => console.error("Erreur lors de la récupération des genres :", error));
  }, []);


  useEffect(() => {
    const fetchMovies = async () => {
      let url;

      if (searchQuery.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=${currentPage}&sort_by=${sortBy}`;
      } else if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US&with_genres=${selectedGenre}&page=${currentPage}&sort_by=${sortBy}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/${activeTab}?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US&page=${currentPage}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.results || []);
        setTotalPages(data.total_pages || 1);
        if (searchQuery.trim()) {
          setSuggestions(data.results.slice(0, 5));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, activeTab, currentPage, sortBy]);


  const toggleFavorite = (movieId) => {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setSuggestions([]);
    setSearchResults([]);
    setSelectedGenre("");
    setCurrentPage(1);
  };


  const handleSearchSelect = (query) => {
    setSearchQuery(query);
    updateSearchHistory(query);
    setSuggestions([]);
    setCurrentPage(1);
  };


  const updateSearchHistory = (query) => {
    const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };


  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setSearchQuery("");
    setSuggestions([]);
    setCurrentPage(1);
  };


  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };


  const handleViewDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>

      <div className="relative flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search movies by name..."
          className="border rounded-lg px-4 py-2 w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />


        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg w-1/2 z-10">
            {suggestions.map((movie) => (
              <div
                key={movie.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchSelect(movie.title)}
              >
                {movie.title}
              </div>
            ))}
          </div>
        )}
      </div>


      {searchHistory.length > 0 && (
        <div className="flex justify-center items-center mb-4">
          <p className="mr-4">Recent searches:</p>
          {searchHistory.map((item, index) => (
            <button
              key={index}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg mr-2"
              onClick={() => handleSearchSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}


      <div className="flex justify-center items-center space-x-4 mb-6">
        <select
          className="border rounded-lg px-4 py-2"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Latest Releases</option>
          <option value="vote_average.desc">Top Rated</option>
        </select>
      </div>


      <nav className="flex justify-center items-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "popular"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => handleTabChange("popular")}
        >
          Popular
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "top_rated"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => handleTabChange("top_rated")}
        >
          Top Rated
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "upcoming"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming
        </button>
      </nav>


      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {searchResults.map((movie) => (
            <div key={movie.id} className="p-3 relative">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full mb-4"
              />
              <h1 className="text-lg font-bold mb-2">{movie.title}</h1>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{movie.overview}</p>
              <button
                onClick={() => handleViewDetails(movie.id)}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm mb-2"
              >
                View Details
              </button>
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
      ) : (
        <PaginatedMovies type={activeTab} />
      )}


      <div className="flex justify-center mt-6 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {Array.from({ length: Math.min(totalPages, 20) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Movies;
