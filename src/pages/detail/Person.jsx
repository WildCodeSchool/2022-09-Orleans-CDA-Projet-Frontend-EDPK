import "./Person.scss";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Person = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const [filmography, setFilmography] = useState();
  const [randMedia, setRandMedia] = useState();

  useEffect(() => {
    (async () => {
      try {
        const personDetails = await axios
          .get(
            `https://api.themoviedb.org/3/person/${personId}?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=en-US`
          )
          .then((res) => res.data);
        setPerson(personDetails);

        if (personDetails.known_for_department === "Directing") {
          const personFilmo = await axios
            .get(
              `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=en-US`
            )
            .then((res) => {
              const raw = res.data.crew.filter(({ job }) => job === "Director");
              return raw
                .sort((a, b) =>
                  a.vote_count < b.vote_count
                    ? 1
                    : b.vote_count < a.vote_count
                    ? -1
                    : 0
                )
                .slice(0, 10);
            });
          setFilmography(personFilmo);
          setRandMedia(Math.floor(Math.random() * 10));
        } else {
          const personFilmo = await axios
            .get(
              `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=en-US`
            )
            .then((res) => {
              return res.data.cast
                .sort((a, b) =>
                  a.vote_count < b.vote_count
                    ? 1
                    : b.vote_count < a.vote_count
                    ? -1
                    : 0
                )
                .slice(0, 10);
            });
          setFilmography(personFilmo);
          setRandMedia(Math.floor(Math.random() * 10));
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="person">
      <div
        className="person_back"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${
            filmography ? filmography[randMedia]?.backdrop_path : null
          })`,
        }}
      ></div>
      <div className="person_front">
        <div
          className="person_profile"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${person?.profile_path})`,
          }}
        ></div>
        <div className="person_content">
          <h1 className="person_name">{person?.name}</h1>
          <div className="person_dates">
            <div>
              <span className="person_dates_label">Born</span>
              <span className="person_dates_content">{person?.birthday}</span>
            </div>
            {person?.deathday ? (
              <div style={{ marginLeft: "1rem" }}>
                <span className="person_dates_label">Died</span>
                <span className="person_dates_content">{person?.deathday}</span>
              </div>
            ) : null}
          </div>
          <div className="person_bio">
            <h2>Biography</h2>
            <div>{person?.biography}</div>
          </div>
          <div className="person_filmo">
            <h2>Filmography</h2>
            <div className="person_filmo_frame">
              {filmography?.map((elem, index) => (
                <Link
                  to={`/movie/${elem.id}`}
                  className="person_filmo_media"
                  key={index}
                >
                  <div
                    className="person_filmo_poster"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${elem.poster_path})`,
                    }}
                  ></div>
                  <div className="person_filmo_title">{elem.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
