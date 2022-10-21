import React from "react";
import "./Home.scss";
import MoviesListHome from "../../components/movieslisthome/MoviesListHome";
import Searchbar from "../../components/searchbar/Searchbar";
import Guide from "../../components/guide/Guide";

function Home() {
  return (
    <div className="home">
      <video src="/videos/video2.mp4" autoPlay loop muted />
      <Searchbar />
      <div className="card">
        <MoviesListHome />
      </div>
      <div className="guide">
        <Guide />
      </div>
    </div>
  );
}
export default Home;
