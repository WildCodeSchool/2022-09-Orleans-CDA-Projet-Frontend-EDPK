import React from "react";
import "./Home.scss";
import MoviesListHome from "../../components/movieslisthome/MoviesListHome";
import Searchbar from "../../components/searchbar/Searchbar";

function Home() {
  return (
    <div className="home">
      <header></header>
      <Searchbar />
      <div className="card">
        <MoviesListHome />
      </div>
    </div>
  );
}
export default Home;
