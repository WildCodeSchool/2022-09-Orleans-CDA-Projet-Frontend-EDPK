import "./Searchbar.scss";
import { useEffect, useState } from "react";

const Searchbar = ({ cat }) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/${cat}?api_key=c27f8ca565d1e0e0b28f3721fb54e05e&language=fr&query=${search}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDisplay(data.results);
        });
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className="search-input">
        <input placeholder="Recherchez un film..." onChange={handleSearch} />
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
                <span>[{cat.toUpperCase()}]</span>
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Searchbar;
