import axios from "axios";
import "./CategoryPage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import genres from "../../data/genres.json";

const CategoryPage = () => {
  const { genre, pageNumber, type } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/discover/${type}?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&adult=false&include_video=false&page=${
          pageNumber * 2 - 1
        }&with_genres=${genre}&with_watch_monetization_types=flatrate`
      )
      .then((response) => response.data)
      .then((data) => {
        axios
          .get(
            `
          https://api.themoviedb.org/3/discover/${type}?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=en-US&adult=false&include_video=false&page=${
              pageNumber * 2
            }&with_genres=${genre}&with_watch_monetization_types=flatrate`
          )
          .then((response) => response.data)
          .then((data2) => {
            setMovies([...data.results, ...data2.results]);
          });
      });
  }, [pageNumber, genre]);

  return (
    <div className="mt-14">
      <h1 className="titles text-center text-5xl mb-12 text-white">
        {genres[genre]}
      </h1>
      <div className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <Link
            className="mb-14 ml-14"
            key={movie.id}
            to={`/movie/${movie.id}`}
          >
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="w-60 rounded"
                alt={movie.title}
              />
              <h3 className="truncate w-60 text-xl font-medium mb-2 mt-2">
                {movie.title}
                {movie.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-8 pagination">
        {pageNumber > 1 ? (
          <button
            onClick={() =>
              navigate(
                `/category/${type}/${genre}/${parseInt(pageNumber, 10) - 1}`
              )
            }
          >
            Previous
          </button>
        ) : (
          <button className="cursor-not-allowed" disabled="disabled">
            Previous
          </button>
        )}

        {pageNumber}
        <button
          onClick={() =>
            navigate(
              `/category/${type}/${genre}/${parseInt(pageNumber, 10) + 1}`
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
