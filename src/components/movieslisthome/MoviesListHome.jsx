import React, { useEffect, useState } from "react";
import "./MoviesListHome.scss";
import axios from "axios";

const MoviesListHome = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_trending = "https://api.themoviedb.org/3/trending/all/day?api_key=";
  const [trending, setTrending] = useState([]);

  async function getTrending(signal) {
    const response = await axios
      .get(url_trending + apiKey, signal)
      .then((res) => res.data);
    const trends = response["results"];
    setTrending(trends);
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    const trendingList = getTrending(opts);
    return () => abortCtrl.abort();
  }, []);

  useEffect(() => {
    console.log(trending);
  }, [trending]);

  return (
    // Card for movies
    /* adult
: 
false
backdrop_path
: 
"/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg"
genre_ids
: 
(3) [28, 14, 27]
id
: 
894205
media_type
: 
"movie"
original_language
: 
"en"
original_title
: 
"Werewolf by Night"
overview
: 
"On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster."
popularity
: 
510.713
poster_path
: 
"/1n2q0Y1pX8PkQh9imqGbNH7Bw4q.jpg"
release_date
: 
"2022-09-25"
title
: 
"Werewolf by Night"
video
: 
false
vote_average
: 
7.442
vote_count
: 
326 */
    <div>
      <div className="movieList mt-5">
        <h2 className="mb-3">Trending</h2>
        <div className="board">
          {trending
            ?.filter((t) => t.media_type === "movie")
            .slice(0, 10)
            .map((t) => (
              <div class="flex p-2">
                <div class="rounded-lg  max-w-sm">
                  <a href="#!">
                    <img
                      class="rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/w500${t.poster_path}`}
                      alt={t.original_title}
                    />
                  </a>
                  <div class="pt-2">
                    <h3 class="text-xl font-medium mb-2">{t.original_title}</h3>
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
