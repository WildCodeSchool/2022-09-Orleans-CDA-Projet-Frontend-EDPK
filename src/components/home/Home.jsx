import React from "react";
import "./Home.scss";
import MoviesListHome from "../MoviesListHome/MoviesListHome";
("../MoviesListHome/MoviesListHome");

function Home() {
  return (
    <div>
      <div className="home">
        <video src="/videos/video2.mp4" autoPlay loop muted />
        <h1>navbar</h1>
        <div className="card">
        < MoviesListHome />
        </div>
      </div>
    </div>
  );
}
export default Home;
