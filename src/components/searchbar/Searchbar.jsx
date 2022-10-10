import "./Searchbar.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Searchbar = ({ media, genreId }) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("");

  const genres = {
    28: "Action",
    10759: "Action & Adventure",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10762: "Kids",
    10402: "Music",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10749: "Romance",
    878: "Science Fiction",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    10768: "War & Politics",
    37: "Western",
  };

  const apiValues = {};
  if (genreId) {
    for (const key in genres) {
      if (key.includes(genreId)) {
        apiValues.genre = genres[key].toLowerCase();
      }
    }
    switch (media) {
      case "movie":
        apiValues.url = `https://api.themoviedb.org/3/discover/movie?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&with_genres=${genreId}`;
        apiValues.media = "MOVIE";
        apiValues.placeholder = `Search a movie of ${apiValues.genre}...`;
        break;
      case "tv":
        apiValues.url = `https://api.themoviedb.org/3/discover/tv?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&with_genres=${genreId}`;
        apiValues.media = "TV SHOW";
        apiValues.placeholder = `Search a TV show of ${apiValues.genre}...`;
        break;
      default:
        break;
    }
  } else {
    switch (media) {
      case "movie":
        apiValues.url = `https://api.themoviedb.org/3/search/movie?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&language=en&page=1&include_adult=false&query=${search}`;
        apiValues.media = "MOVIE";
        apiValues.placeholder = "Search a movie...";
        break;
      case "tv":
        apiValues.url = `https://api.themoviedb.org/3/search/tv?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&language=en&page=1&include_adult=false&query=${search}`;
        apiValues.media = "TV SHOW";
        apiValues.placeholder = "Search a TV show...";
        break;
      default:
        apiValues.url = `https://api.themoviedb.org/3/search/multi?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&language=en&page=1&include_adult=false&query=${search}`;
        apiValues.placeholder = "Search a movie, a TV show, or a person...";
        break;
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      axios
        .get(apiValues.url)
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
          placeholder={apiValues.placeholder}
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
                  {media ? apiValues.media : item.media_type.toUpperCase()}
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
