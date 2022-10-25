import "./Person.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Person = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();

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

        if (personDetails.known_for_department === "Directing") {
          await axios
            .get(
              `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=en-US`
            )
            .then((res) => {
              res.data.crew.job.includes("");
            });
        } else {
          await axios
            .get(
              `https://api.themoviedb.org/3/person/${personId}?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=en-US`
            )
            .then((res) => res.data);
        }

        setPerson(personDetails);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="person">
      <div className="person_box">
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
