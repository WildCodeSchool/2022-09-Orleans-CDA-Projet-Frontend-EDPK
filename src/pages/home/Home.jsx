import React from "react";
import "./Home.scss";
import MoviesListHome from "../../components/movieslisthome/MoviesListHome";
import Searchbar from "../../components/searchbar/Searchbar";
import Guide from "../../components/guide/Guide";

function Home() {
  return (
    <div className="home">
      <header>
        <video
          src={`${import.meta.env.BASE_URL}videos/video.mp4`}
          alt="Video of introduction"
          autoPlay
          loop
          muted
        />
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
