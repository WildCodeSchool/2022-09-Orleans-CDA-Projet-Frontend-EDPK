import "./Person.scss";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useSize from "../../hooks/useSize";
import axios from "axios";

const Person = () => {
  const targetFront = useRef(null);
  const sizeFront = useSize(targetFront);

  const { personId } = useParams();
  const [person, setPerson] = useState();
  const [age, setAge] = useState("");
  const [filmography, setFilmography] = useState();
  const [randMedia, setRandMedia] = useState();

  useEffect(() => {
    if (
      document?.getElementsByClassName("person-back")[0]?.style?.height &&
      sizeFront?.height
    ) {
      if (
        document.getElementsByClassName("person-back")[0].style.height !==
        sizeFront.height + "px"
      ) {
        document.getElementsByClassName("person-back")[0].style.height =
          "calc(10rem + " + sizeFront.height + "px)";
      }
    }
  }, [sizeFront]);

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

        const birthday = new Date(personDetails.birthday);
        if (personDetails.deathday !== null) {
          const deathday = new Date(personDetails.deathday);
          setAge(
            Math.floor((deathday - birthday) / (1000 * 60 * 60 * 24 * 365))
          );
        } else {
          const today = new Date();
          setAge(Math.floor((today - birthday) / (1000 * 60 * 60 * 24 * 365)));
        }

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
        className="person-back"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${
            filmography ? filmography[randMedia]?.backdrop_path : null
          })`,
          height: "80vh",
        }}
      ></div>
      <div className="person-front" ref={targetFront}>
        <div
          className="person-profile"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${person?.profile_path})`,
          }}
        ></div>
        <div className="person-content">
          <h1 className="person-name">{person?.name}</h1>
          <div className="person-dates">
            <div className="person-date">
              <span className="person-dates-label">Born</span>
              <span className="person-dates-content">{person?.birthday}</span>
            </div>
            {person?.deathday ? (
              <div className="person-date">
                <span className="person-dates-label">Died</span>
                <span className="person-dates-content">{person?.deathday}</span>
              </div>
            ) : null}
            <div className="person-date">
              <span className="person-dates-label">Age</span>
              <span className="person-dates-content">
                {age !== null ? age : null} years
              </span>
            </div>
          </div>
          <div className="person-bio">
            <h2>Biography</h2>
            <div>{person?.biography}</div>
          </div>
          <div className="person-filmo">
            <h2>Filmography</h2>
            <div className="person-filmo-frame">
              {filmography?.map((elem, index) => (
                <Link
                  to={`/movie/${elem.id}`}
                  className="person-filmo-media"
                  key={index}
                >
                  <div
                    className="person-filmo-poster"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${elem.poster_path})`,
                    }}
                  ></div>
                  <div className="person-filmo-title">{elem.title}</div>
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
