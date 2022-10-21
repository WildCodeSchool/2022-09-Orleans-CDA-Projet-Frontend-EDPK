import React, { useEffect, useState } from "react";
import "./movie.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { movieId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_movie_detail = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const url_movie_actors = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const [movie, setMovie] = useState({});
  const [characters, setCharacters] = useState([]);
  const [actors, setActors] = useState([]);

  async function getMovieById(signal) {
    try {
      const response = await axios
        .get(url_movie_detail, signal)
        .then((res) => res.data);
      setMovie(response);
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
        .get(url_movie_actors, signal)
        .then((res) => res?.data?.cast);

      if (response && Array.isArray(response)) setCharacters(response);
    } catch (error) {}
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getActorsByMovie(opts);
    return () => abortCtrl.abort();
  }, [movie]);

  useEffect(() => {
    // Do only if characters is not empty and actors is empty for use only once time
    if (characters.length > 0 && actors.length === 0) {
      //find the 3 pincipals 'actors' of the movie
      const actors = characters
        ?.filter((c) => c.known_for_department === "Acting")
        ?.slice(0, 3);
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
              : "https://via.placeholder.com/1920x1080"
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row md:max-w-5xl rounded-lg bg-white shadow-lg md:my-20 shadow-2xl">
            <img
              className=" w-full h-96 md:h-auto object-cover md:w-90 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : ""
              }
              alt=""
            />
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-3xl font-medium mb-2 text-center">
                {movie.title}
              </h5>

              <ul className="py-2">
                {movie.genres?.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    {g.name}
                  </button>
                ))}
              </ul>
              <p className="text-gray-400 py-2">
                release date : {movie.release_date}
              </p>
              <p className="text-gray-600 text-base mb-4">
                <b>Overview : </b>
                {movie.overview}
              </p>
              <hr />
              <p className="text-gray-600 p-4">
                Average rating : {movie.vote_average}
              </p>
              <hr />
              <br />
              {/** view actors */}

              <div className="items-center">
                <div className="flex items-center space-x-2 text-base">
                  <h4 className="font-semibold text-slate-900">
                    Main actors :
                  </h4>
                </div>
                <div className="mt-3 mr-4 p-4 flex overflow-hidden">
                  {actors?.map((c) => (
                    <div key={c.id} className="relative mr-6">
                      <img
                        id={c.id}
                        className={
                          "inline-block transition duration-20 ease-in-out shadow-inner border rounded-lg max-w-full h-auto hover:scale-125"
                        }
                        data-bs-toggle="tooltip"
                        title={c.name}
                        src={"https://image.tmdb.org/t/p/w500" + c.profile_path}
                        alt={c.name}
                      />
                      <div
                        id={"text-" + c.id}
                        className={
                          "absolute bottom-0 left-0 right-0 px-2 py-1 bg-gray-800 opacity-70 "
                        }
                      >
                        <p className="text-xs text-white font-bold">{c.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
