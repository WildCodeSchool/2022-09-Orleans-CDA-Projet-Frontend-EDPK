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
    }
    catch(error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getMovieById(opts);
    console.log('test');
    window.scrollTo(0, 0);
    return () => abortCtrl.abort();
  }, []);

  async function getActorsByMovie(signal) {
    try {
      const response = await axios
        .get(url_movie_actors, signal)
        .then((res) => res?.data?.cast);  

      if (response && Array.isArray(response)) setCharacters(response);
    }
    catch(error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getActorsByMovie(opts);
    return () => abortCtrl.abort();
  }, [movie]);

  useEffect(() => {
    const controller = new AbortController();

    // Do only if characters is not empty and actors is empty for use only once time
    if (characters.length > 0 && actors.length === 0) {
      //give me only the 3 pincipals 'actors' of the movie
      const actors = characters
        ?.filter((c) => c.known_for_department === "Acting")
        ?.slice(0, 3);
      setActors(actors);
    }

    return () => controller.abort();
  }, [characters]);

  return (
    <>
      <div
        className="container h-screen w-screen"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://image.tmdb.org/t/p/original${
            movie.backdrop_path ?? "/1"
          }')`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <img
              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : ""
              }
              alt=""
            />
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-4xl font-medium mb-2">
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
                release date : ({movie.release_date})
              </p>
              <p className="text-gray-600 text-base mb-4">
                <b>Overview : </b>
                {movie.overview}
              </p>

              <p className="text-gray-600">
                Average rating : {movie.vote_average}
              </p>
              <br />
              {/** view actors */}

              <div className="items-center">
                <div className="flex items-center space-x-2 text-base">
                  <h4 className="font-semibold text-slate-900">
                    Main actors :
                  </h4>
                </div>
                <div className="mt-3 flex overflow-hidden">
                  {actors?.map((c) => (
                    <img
                      key={c.id}
                      className="inline-block h-24 w-24 rounded-3xl pic-star transition duration-150 ease-in-out"
                      data-bs-toggle="tooltip"
                      title={c.name}
                      src={"https://image.tmdb.org/t/p/w500" + c.profile_path}
                      alt={c.name}
                    />
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
