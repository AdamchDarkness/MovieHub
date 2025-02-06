
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchMovie() {
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc"); 
  const navigate = useNavigate();


  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US`)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || []))
      .catch((error) => console.error("Erreur lors de la récupération des genres :", error));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=4eb6efd4771eb99f2327f5accc198668&language=en-US&query=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setSuggestions(data.results?.slice(0, 5) || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setSuggestions([]);
    setSelectedGenre("");
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchSelect = (query) => {
    setSearchQuery(query);
    updateSearchHistory(query);
    setSuggestions([]);
  };

  const updateSearchHistory = (query) => {
    const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    setSuggestions([]);
  };

  const handleFullSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/movie?search=${encodeURIComponent(searchQuery)}`);
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

        <button
          onClick={handleFullSearch}
          className="ml-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <p className="mr-4">Recent searches:</p>
          {searchHistory.map((item, index) => (
            <button
              key={index}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg mr-2 mt-2"
              onClick={() => handleHistoryClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
     
    
    </div>
  );
}

export default SearchMovie;
