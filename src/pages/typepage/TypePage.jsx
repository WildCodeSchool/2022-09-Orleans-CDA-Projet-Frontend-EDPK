import axios from "axios";
import { useEffect, useState } from "react";

const TypePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Drama&with_watch_monetization_types=flatrate
      `
      )
      .then((response) => response.data)
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  }, []);
  return (
    <div>
      BITE
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default TypePage;
