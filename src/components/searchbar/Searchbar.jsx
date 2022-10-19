import "./Searchbar.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import genres from "../../data/genres.json";

const Searchbar = ({ media = null, genreId = null }) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    url: `https://api.themoviedb.org/3/search/multi?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en&page=1&include_adult=false&query=`,
    placeholder: "Search a movie, a TV show, or a person...",
  });

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
          }&language=en&page=1&include_adult=false&query=`;
          defaultValues.media = "MOVIE";
          defaultValues.placeholder = "Search a movie...";
          break;
        case "tv":
          defaultValues.url = `https://api.themoviedb.org/3/search/tv?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en&page=1&include_adult=false&query=`;
          defaultValues.media = "TV SHOW";
          defaultValues.placeholder = "Search a TV show...";
          break;
        default:
          defaultValues.url = `https://api.themoviedb.org/3/search/multi?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en&page=1&include_adult=false&query=`;
          defaultValues.placeholder =
            "Search a movie, a TV show, or a person...";
          break;
      }
    }
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (search != "") {
        axios
          .get(genreId ? defaultValues.url : defaultValues.url + search)
          .then((res) => res.data)
          .then((data) => {
            setDisplay(data.results);
          });
      } else {
        setDisplay("");
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [search]);

  const focusInSearch = () => {
    document
      .getElementsByClassName("searchbar")[0]
      .scrollIntoView({ behavior: "smooth" });
    document.body.style.overflow = "hidden";
    document.getElementsByClassName("search-fog")[0].style.display = "block";
    document.getElementsByClassName("search-input")[0].style.zIndex = "3";
    if (document.getElementsByClassName("search-list").length) {
      document.getElementsByClassName("search-list")[0].style.display = "flex";
    }
  };

  const focusOutSearch = () => {
    document.body.style.overflow = "initial";
    document.getElementsByClassName("search-fog")[0].style.display = "none";
    document.getElementsByClassName("search-input")[0].style.zIndex = "1";
    if (document.getElementsByClassName("search-list").length) {
      document.getElementsByClassName("search-list")[0].style.display = "none";
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className="searchbar">
        <div className="search-input">
          <input
            placeholder={defaultValues.placeholder}
            onChange={handleSearch}
            onFocus={focusInSearch}
          />
          <div className="search-icon">
            <svg
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </div>
        </div>
        <div className="search-fog" onClick={focusOutSearch}></div>
      </div>
      {display && (
        <div className="search-list">
          {display.map((item) => (
            <Link
              to={`/${item.media_type}/${item.id}`}
              className="search-list-item"
              key={item.id}
              style={
                item.media_type === "movie"
                  ? { borderBottom: "0.5rem solid #710000" }
                  : item.media_type === "tv"
                  ? { borderBottom: "0.5rem solid #1700a3" }
                  : { borderBottom: "0.5rem solid #0c4e01" }
              }
            >
              <div className="search-title">
                {item.media_type === "movie" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 266.62 231.65"
                  >
                    <path d="M0,46.55c.96-3.94,1.57-8.01,2.93-11.81C11.11,11.71,32.68-1.99,56.93,.24c23.04,2.11,42.61,20.91,45.66,43.82,.13,.98,.41,1.93,.75,3.49C105.95,19.23,130.09-2.36,159.56,.23c26.09,2.3,46.61,24.21,46.75,51.05,.15,27.09-20.59,49.09-46.47,51.58-28.4,2.73-53.52-17.79-56.68-46.42-.51,2.47-.93,4.97-1.54,7.42-5.86,23.21-25.96,39.04-49.85,39.31-25.52,.29-47.68-18.83-51.26-44.22C.42,58.27,.17,57.62,0,56.96c0-3.47,0-6.94,0-10.41Zm51.56,26.08c11.63,.03,21.29-9.6,21.19-21.13-.1-11.54-9.48-20.95-21.03-21.08-11.8-.14-21.17,9.1-21.23,20.93-.05,11.6,9.51,21.25,21.06,21.28Zm82.16-21.32c-.16,11.46,9.27,21.13,20.77,21.31,11.64,.18,21.21-9.15,21.44-20.91,.22-11.44-9.48-21.23-21.1-21.3-11.64-.07-20.94,9.14-21.11,20.89Z" />
                    <path d="M103.41,231.63c-21.52,0-43.04,0-64.56,0-11.04,0-19.52-4.65-24.43-14.6-1.71-3.46-2.75-7.61-2.79-11.46-.24-25.86-.18-51.72-.1-77.57,.03-8.51,3.57-15.4,10.38-20.59,1.38-1.05,2.53-1.25,4.21-.49,19.7,8.9,38.86,7.62,57.48-3.23,.91-.53,2.09-.85,3.15-.86,10.93-.06,21.87-.07,32.8,0,1.21,0,2.55,.45,3.61,1.07,17.95,10.47,36.52,11.67,55.59,3.55,3.08-1.31,5.04-.85,7.33,1.21,5.88,5.29,9.05,11.88,9.08,19.71,.12,25.6,.13,51.2,.01,76.79-.07,15.29-11.57,26.38-27.2,26.44-18.05,.07-36.1,.02-54.15,.02-3.47,0-6.94,0-10.41,0Z" />
                    <path d="M266.24,167.74c0,13.79,.03,27.58-.01,41.38-.02,6.19-2.78,10.44-8.11,11.4-2.54,.46-5.77,.23-7.96-1-14.74-8.26-29.26-16.9-43.9-25.33-1.65-.95-2.2-1.99-2.19-3.88,.08-15.27,.08-30.53,0-45.8,0-1.71,.52-2.61,2-3.46,14.35-8.24,28.64-16.6,42.98-24.87,6.53-3.77,12.9-2.3,16.24,3.93,.97,1.8,1.24,4.15,1.25,6.25,.11,13.79,.05,27.58,.05,41.37h-.36Z" />
                  </svg>
                ) : item.media_type === "tv" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 360.72 351.41"
                  >
                    <path d="M360.72,105.92v222.62c-1.72,4.05-2.84,8.52-5.29,12.07-5.67,8.22-14.15,10.8-23.91,10.8-100.72-.08-201.45-.05-302.17-.06-1.41,0-2.82-.03-4.22-.13C10.38,350.15,.08,339.51,.06,324.69-.04,253.08,0,181.47,.03,109.86c0-6.03,1.68-11.57,5.41-16.4,5.86-7.56,13.74-10.42,23.11-10.4,34.87,.09,69.73,.04,104.6,.04,1.32,0,2.64,0,4.48,0-1.07-1.82-1.7-2.94-2.37-4.04-11.9-19.53-23.82-39.05-35.71-58.59-.79-1.3-1.62-2.6-2.2-4C94.07,8.65,99.64,.18,108.12,.04c5.46-.09,8.82,2.98,11.49,7.38,14.72,24.27,29.54,48.48,44.23,72.76,1.32,2.18,2.72,3.04,5.28,2.98,7.51-.18,15.03-.18,22.54,0,2.59,.06,3.96-.87,5.26-3.02,14.57-24.08,29.24-48.11,43.9-72.14,.85-1.4,1.71-2.82,2.78-4.05,3.26-3.73,8.58-4.94,13.17-3.12,4.71,1.86,7.87,6.19,7.38,11.23-.26,2.68-1.31,5.49-2.71,7.81-11.97,19.9-24.1,39.7-36.17,59.54-.63,1.04-1.19,2.13-2.05,3.69,1.98,0,3.36,0,4.74,0,34.63,0,69.26,.05,103.89-.04,7.82-.02,14.83,1.79,20.67,7.25,4.55,4.26,6.74,9.73,8.18,15.6Zm-213.12,202.17c29.58,0,59.17,0,88.75,0,11.09,0,16.59-5.54,16.59-16.68,0-49.42,0-98.85,0-148.27,0-11.31-5.49-16.75-16.88-16.75-58.93,0-117.87,0-176.8,0-11.33,0-16.84,5.51-16.84,16.86,0,49.31,0,98.61,0,147.92,0,11.39,5.49,16.92,16.78,16.93,29.47,0,58.93,0,88.4,0Zm133.43-138.16c.04,13.54,11.2,24.69,24.65,24.61,13.42-.08,24.7-11.41,24.62-24.75-.07-13.49-11.25-24.56-24.76-24.52-13.61,.04-24.55,11.04-24.51,24.66Zm0,94.75c.05,13.61,11.05,24.55,24.66,24.5,13.53-.05,24.71-11.25,24.61-24.66-.1-13.41-11.48-24.72-24.77-24.61-13.53,.11-24.55,11.25-24.5,24.77Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 340.79 408.86"
                  >
                    <path d="M63.01,408.86c-4.64-.97-9.36-1.67-13.91-2.95C19.97,397.71,1.55,375.24,.27,344.66c-1.33-31.59,2.14-62.73,14.15-92.31,7.75-19.1,19.01-35.62,37.88-45.71,11.64-6.22,24.12-9.19,37.18-8.92,4.12,.09,8.45,2.17,12.21,4.21,6.06,3.29,11.67,7.39,17.55,11.02,34.19,21.11,68.4,21.09,102.56-.08,4.74-2.94,9.59-5.78,14.04-9.12,8.18-6.13,17.17-6.89,26.89-5.47,26.51,3.9,45.24,18.42,57.87,41.59,11.27,20.68,16.35,43.15,18.6,66.3,1.16,11.89,1.71,23.89,1.56,35.83-.43,35.66-24.91,62.2-60.38,66.11-.88,.1-1.73,.49-2.6,.75H63.01Z" />
                    <path d="M167.74,197c-54.85-.33-98.72-44.48-98.31-98.93C69.84,43.42,113.88,0,168.25,0c53.42,0,98.62,44.32,98.14,98.78-.48,54.77-44.51,98.55-98.65,98.22Z" />
                  </svg>
                )}
                <span>{item.title ? item.title : item.name}</span>
              </div>
              {item.poster_path ? (
                <div
                  className="search-poster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                  }}
                ></div>
              ) : item.profile_path ? (
                <div
                  className="search-poster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`,
                  }}
                ></div>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Searchbar;
