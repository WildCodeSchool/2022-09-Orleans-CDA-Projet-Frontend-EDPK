import "./Searchbar.scss";
import { useEffect, useState } from "react";

const Searchbar = ({ media, genre }) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("");

  const movieGenres = {
    28: "Action",
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
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const tvGenres = {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western",
  };

  const apiValues = {};
  if (genre) {
    switch (media) {
      case "movie":
        apiValues.url = `https://api.themoviedb.org/3/discover/movie?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&with_genres=28`;
        apiValues.media = "MOVIE";
        apiValues.placeholder = "Search a movie...";
        break;
      case "tv":
        apiValues.url = `https://api.themoviedb.org/3/discover/tv?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&with_genres=28`;
        apiValues.media = "TV SHOW";
        apiValues.placeholder = "Search a TV show...";
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
        break;
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetch(apiValues.url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDisplay(data.results);
        });
    }, 500);
    return () => clearTimeout(timeOut);
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className="search-input">
        <input placeholder={apiValues.placeholder} onChange={handleSearch} />
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
