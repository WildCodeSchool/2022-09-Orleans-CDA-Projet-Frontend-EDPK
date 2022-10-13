import React, { useEffect, useState } from "react";
import "./movie.scss";
import axios from "axios";

const Movie = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_movie_detail = "https://api.themoviedb.org/3/movie/550?api_key=";
  const url_movie_actors =
    "https://api.themoviedb.org/3/movie/550/credits?api_key=";
  const [movie, setMovie] = useState({});
  const [characters, setCharacters] = useState([]);

  async function getMovieById(signal) {
    const response = await axios
      .get(url_movie_detail + apiKey, signal)
      .then((res) => res.data);
    return response && setMovie(response);
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getMovieById(opts);
    return () => abortCtrl.abort();
  }, []);

  async function getActorsByMovie(signal) {
    const response = await axios
      .get(url_movie_actors + apiKey, signal)
      .then((res) => res.data);
    const [...actors] = response["cast"];
    actors && setCharacters(actors);
    console.log(characters);
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getActorsByMovie(opts);
    return () => abortCtrl.abort();
  }, [movie]);

  return (
    <>
      <div
        className="container h-screen w-screen"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center mt-20">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <img
              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {movie.title}
              </h5>
              <ul>
                {movie.genres?.map((g) => (
                  <button
                    type="button"
                    key={g.id}
                    className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    {g.name}
                  </button>
                ))}
              </ul>
              <br />
              <p className="text-gray-400">
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
                  {characters
                    ?.filter((char) => char.known_for_department === "Acting")
                    .slice(0, 3)
                    .map((c, key) => (
                      <>
                        <img
                          className="inline-block h-24 w-24 rounded-3xl pic-star transition duration-150 ease-in-out"
                          data-bs-toggle="tooltip"
                          title="Hi! I'm tooltip"
                          src={
                            "https://image.tmdb.org/t/p/w500" + c.profile_path
                          }
                          alt={c.name}
                        />
                      </>
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
