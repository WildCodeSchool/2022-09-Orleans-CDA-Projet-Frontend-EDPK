import React, { useEffect, useState } from "react";
import "./movie.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import Popup from "../../components/Popup";

const Movie = () => {
  const { movieId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const urlMovieDetail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const urlMovieActors = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const urlMovieVideos = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
  const [movie, setMovie] = useState({});
  const [characters, setCharacters] = useState([]);
  const [actors, setActors] = useState([]);
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  async function getMovieById(signal) {
    try {
      const response = await axios
        .get(urlMovieDetail, signal)
        .then((res) => res.data);

      setMovie(response);
    } catch (error) {
      if (error.response.status && error.response.status === 404) {
        return navigate("/404");
      } else if (error.response.status && error.response.status === 500) {
        return navigate("/500");
      }
    }
  }

  async function getVideosByTv(signal) {
    try {
      const response = await axios
        .get(urlMovieVideos, signal)
        .then((res) => res?.data?.results);
      if (response && Array.isArray(response)) setVideos(response);
    } catch (error) {}
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getMovieById(opts);
    return () => abortCtrl.abort();
  }, []);

  async function getActorsByMovie(signal) {
    try {
      const response = await axios
        .get(urlMovieActors, signal)
        .then((res) => res?.data?.cast);

      if (response && Array.isArray(response)) setCharacters(response);
    } catch (error) {}
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getActorsByMovie(opts);
    getVideosByTv(opts);
    return () => abortCtrl.abort();
  }, [movie]);

  useEffect(() => {
    // Do only if characters is not empty and actors is empty for use only once time
    if (characters.length > 0 && actors.length === 0) {
      //find the 3 pincipals 'actors' of the movie with photo
      const actors = characters
        ?.filter(
          (c) => c.known_for_department === "Acting" && c.profile_path !== null
        )
        ?.slice(0, 10);
      setActors(actors);
    }
    window.scrollTo(0, 100);
  }, [characters]);

  return (
    <>
      <div
        className="movie flex flex-col justify-center items-center"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${
            movie.backdrop_path
              ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
              : "https://via.placeholder.com/1920x1080/000000"
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* card */}
        {Object.keys(movie).length ? (
          <>
            {movie.adult ? <Popup /> : null}
            <Card type="movie" data={movie} actors={actors} videos={videos} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Movie;
