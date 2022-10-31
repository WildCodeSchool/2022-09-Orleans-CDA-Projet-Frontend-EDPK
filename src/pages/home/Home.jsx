import React from "react";
import "./Home.scss";
import MoviesListHome from "../../components/movieslisthome/MoviesListHome";
import Searchbar from "../../components/searchbar/Searchbar";
import Guide from "../../components/guide/Guide";

document.querySelector("video").playbackRate = 0.75;
function Home() {
  return (
    <div className="home">
      <header>
        <video src="/videos/video3.mp4" autoPlay loop muted />
      </header>
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
