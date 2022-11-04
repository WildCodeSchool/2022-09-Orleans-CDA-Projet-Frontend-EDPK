import { useEffect, useState } from "react";
import "./MoviesListHome.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const MoviesListHome = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const urlTrending = "https://api.themoviedb.org/3/trending/all/day?api_key=";
  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [movies, setMovies] = useState([]);

  async function getTrending(signal) {
    const response = await axios
      .get(urlTrending + apiKey, signal)
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
    setMovies(trending?.filter((t) => t.media_type === "movie").slice(0, 7));
    setTv(trending?.filter((t) => t.media_type === "tv").slice(0, 7));
  }, [trending]);

  return (
    <div>
      <div className="movie-List mt-5">
        <h2 className="mb-3">Trending Movies</h2>
        <div className="board">
          {movies.map((t) => (
            <div key={t.id} className="flex p-2">
              <div className="rounded-lg  max-w-sm">
                <Link to={`/movie/${t.id}`}>
                  <img
                    className="rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt={t.original_title}
                  />
                </Link>

                <div className="pt-2">
                  <h3 className="text-xl font-medium mb-2">{t.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="movie-List mt-5">
        <h2 className="mb-3">Trending TV Shows</h2>
        <div className="board">
          {tv.map((t) => (
            <div key={t.id} className="flex p-2">
              <div className="rounded-lg  max-w-sm">
                <Link to={`/tv/${t.id}`}>
                  <img
                    className="rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                    alt={t.original_title}
                  />
                </Link>
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
