import React from "react";
import "./Home.scss";
import Searchbar from "../searchbar/Searchbar";

function Home() {
  return (
    <div>
      <div className="home">
        <video src="/videos/video2.mp4" autoPlay loop muted />
        <h1>navbar</h1>
        <Searchbar cat="movie" />
      </div>
    </div>
  );
}
export default Home;
