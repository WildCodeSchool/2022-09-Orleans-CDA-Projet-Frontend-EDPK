import { useEffect, useState } from "react";
import "./MoviesListHome.scss";
import axios from "axios";

const MoviesListHome = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_trending = "https://api.themoviedb.org/3/trending/all/day?api_key=";
  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [movies, setMovies] = useState([]);

  async function getTrending(signal) {
    const response = await axios
      .get(url_trending + apiKey, signal)
      .then((res) => res.data);
    const trends = response.results;
    setTrending(trends);
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    const trendingList = getTrending(opts);
    return () => abortCtrl.abort();
  }, []);

  useEffect(() => {
    setMovies(trending?.filter((t) => t.media_type === "movie").slice(0, 10));
    setTv(trending?.filter((t) => t.media_type === "tv").slice(0, 10));
    console.log(trending);
  }, [trending]);

  return (
    <div>
      <div className="movieList mt-5">
        <h2 className="mb-3">Trending Movies</h2>
        <div className="board">
          {movies.map((t) => (
            <div key={t.id} className="flex p-2">
              <div className="rounded-lg  max-w-sm">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt={t.original_title}
                  />
                </a>
                <div className="pt-2">
                  <h3 className="text-xl font-medium mb-2">{t.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="movieList mt-5">
        <h2 className="mb-3">Trending TV Shows</h2>
        <div className="board">
          {tv.map((t) => (
            <div key={t.id} className="flex p-2">
              <div className="rounded-lg  max-w-sm">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt={t.original_title}
                  />
                </a>
                <div className="pt-2">
                  <h3 className="text-xl font-medium mb-2">{t.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MoviesListHome;

/* <div className="">
                  <div className="card flex justify-evenly">
                  <a href="#!">
                    <img
                      className="rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                      alt={t.original_title}
                    />
                  </a>
                  </div>
                  
                    <h2 className="text-gray-1000 text-xl font-medium">
                      {t.original_title}
                    </h2>
                  
                </div> */
