import "./Searchbar.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import genres from "../../data/genres.json";

const Searchbar = ({ media = null, genreId = null }) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("");
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (genreId) {
      for (const key in genres) {
        if (key.includes(genreId)) {
          defaultValues.genre = genres[key].toLowerCase();
        }
      }
      switch (media) {
        case "movie":
          defaultValues.url = `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&with_genres=${genreId}`;
          defaultValues.media = "MOVIE";
          defaultValues.placeholder = `Search a movie of ${defaultValues.genre}...`;
          break;
        case "tv":
          defaultValues.url = `https://api.themoviedb.org/3/discover/tv?api_key=${
            import.meta.env.VITE_API_KEY
          }&with_genres=${genreId}`;
          defaultValues.media = "TV SHOW";
          defaultValues.placeholder = `Search a TV show of ${defaultValues.genre}...`;
          break;
        default:
          break;
      }
    } else {
      switch (media) {
        case "movie":
          defaultValues.url = `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en&page=1&include_adult=false&query=${search}`;
          defaultValues.media = "MOVIE";
          defaultValues.placeholder = "Search a movie...";
          break;
        case "tv":
          defaultValues.url = `https://api.themoviedb.org/3/search/tv?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en&page=1&include_adult=false&query=${search}`;
          defaultValues.media = "TV SHOW";
          defaultValues.placeholder = "Search a TV show...";
          break;
        default:
          defaultValues.url = `https://api.themoviedb.org/3/search/multi?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en&page=1&include_adult=false&query=${search}`;
          defaultValues.placeholder =
            "Search a movie, a TV show, or a person...";
          break;
      }
    }
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      axios
        .get(defaultValues.url)
        .then((res) => res.data)
        .then((data) => {
          setDisplay(data.results);
        });
    }, 500);
    return () => clearTimeout(timeOut);
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className="search-input">
        <label htmlFor="search_home">Are you searching something ?</label>
        <input
          id="search_home"
          placeholder={defaultValues.placeholder}
          onChange={handleSearch}
        />
      </div>
      {display && (
        <div className="search-list">
          {display.map((item) => (
            <div className="search-list-item" key={item.id}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/src/assets/default_img.jpg"
                }
                alt={`Poster of ${item.title}`}
              />
              <div>
                <span>
                  {media ? defaultValues.media : item.media_type.toUpperCase()}
                </span>
                <span>{item.title ? item.title : item.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Searchbar;
