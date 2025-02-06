import React from "react";
import Hero from "../../Components/Hero/Hero";
import Caroussel from "../../Components/Caroussel/Caroussel";
import MoviesList from "../../Components/MoviesList/MoviesList";
import './Home.css';

function Home() {
  return (
    <div className="p-6">
      <Hero /> <Caroussel/>
      <br />
      <hr />
      <h2 className="m-3 text-2xl font-bold mt-6">Popular</h2>
      <MoviesList type="popular" nbrResultats={6} />
      <br />
      <hr />
      <h2 className="m-3 text-2xl font-bold mt-6">Top Rated</h2>
      <MoviesList type="top_rated" nbrResultats={6} />
      <br />
      <hr />
      <h2 className="m-3 text-2xl font-bold mt-6">Now Playing</h2>
      <MoviesList type="now_playing" nbrResultats={6} />
    </div>
  );
}

export default Home;
