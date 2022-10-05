import React from "react";
import "./Home.scss";
import MoviesListHome from "../MoviesListHome/MoviesListHome";
import Searchbar from "../searchbar/Searchbar";

function Home() {
  return (
    <div className="home">
      <h1>navbar</h1>
      <video src="/videos/video2.mp4" autoPlay loop muted />
      <Searchbar cat="movie" />
      <div className="card">
        <MoviesListHome />
      </div>
    </div>
  );
}
export default Home;
