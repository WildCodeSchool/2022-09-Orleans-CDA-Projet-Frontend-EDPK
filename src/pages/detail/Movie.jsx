import React, { useEffect, useState } from "react";
import "./movie.scss";
import axios from "axios";
import Rating from "../../components/Rating";

const Movie = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_movie_detail = "https://api.themoviedb.org/3/movie/550?api_key=";
  const [movie, setMovie] = useState({});
  const [caracters, setCharacters] = useState({});

  async function getMovieById() {
    const response = await axios
      .get(url_movie_detail + apiKey)
      .then((res) => res.data);
    setMovie(response);
  }

  let mounted = true;
  useEffect(() => {
    // run only once the function
    mounted && getMovieById();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="container h-screen w-screen"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
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
            <p className="text-gray-400">
              release date : ({movie.release_date})
            </p>
            <p className="text-gray-600 text-base mb-4">
              <b>Overview : </b>
              {movie.overview}
            </p>
            <div>
              <Rating note={movie.vote_average} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
