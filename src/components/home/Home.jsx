import React from "react";
import "./Home.scss";
import MoviesListHome from "../MoviesListHome/MoviesListHome";

function Home() {
  return (
    <div className="home">
      <video src="/videos/video2.mp4" autoPlay loop muted />
      <div className="card">
        <MoviesListHome />
      </div>
    </div>
  );
}
export default Home;
