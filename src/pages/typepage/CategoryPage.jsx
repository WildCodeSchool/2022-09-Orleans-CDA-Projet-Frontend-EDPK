import axios from "axios";
import "./CategoryPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
      )
      .then((response) => response.data)
      .then((data) => {
        axios
          .get(
            `
          https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&adult=false&include_video=false&page=${
              page + 1
            }&with_genres=${genre}&with_watch_monetization_types=flatrate`
          )
          .then((response) => response.data)
          .then((data2) => {
            setMovies([...data.results, ...data2.results]);
            console.log(data.page);
          });
      });
  }, [page, genre]);
  return (
    <div>
      <div className="m-9 justify-items-stretch grid grid-cols-5 ">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="w-60 rounded"
              alt={movie.title}
            />
            <h2 className="mt-3 mb-5 w-60 truncate text-white">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>
      <div className="mt-9 mb-8 pagination">
        <button onClick={() => setPage(page - 2)}>Previous</button>
        {page} & {page + 1}
        <button onClick={() => setPage(page + 2)}>Next</button>
      </div>
    </div>
  );
};

export default CategoryPage;
