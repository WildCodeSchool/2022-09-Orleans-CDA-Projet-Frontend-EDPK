import React from "react";
import "./Home.scss";
import MoviesListHome from "../../components/movieslisthome/MoviesListHome";
import Searchbar from "../../components/searchbar/Searchbar";

function Home() {
  return (
    <div className="home">
      <video src="/videos/video2.mp4" autoPlay loop muted />
      <Searchbar media="" genreId="" />
      <div className="card">
        <MoviesListHome />
      </div>
    </div>
  );
}
export default Home;
