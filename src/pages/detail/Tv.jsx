import React, { useEffect, useState } from "react";
import "./tv.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

const Tv = () => {
  const { tvId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url_tv_detail = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;
  const url_tv_actors = `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${apiKey}`;
  const url_tv_seasons = `https://api.themoviedb.org/3/tv/${tvId}/season/1?api_key=${apiKey}`; //todo
  const url_tv_episodes = `https://api.themoviedb.org/3/tv/${tvId}/season/1/episode/1?api_key=${apiKey}`; //todo
  const url_tv_videos = `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${apiKey}`;
  const [tv, setTv] = useState({});
  const [characters, setCharacters] = useState([]);
  const [actors, setActors] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoPlayer, setVideoPlayer] = useState(false);

  async function getTvById(signal) {
    try {
      const response = await axios
        .get(url_tv_detail, signal)
        .then((res) => res.data);
      setTv(response);
    } catch (error) {}
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getTvById(opts);
    return () => abortCtrl.abort();
  }, []);

  async function getActorsByTv(signal) {
    try {
      const response = await axios
        .get(url_tv_actors, signal)
        .then((res) => res?.data?.cast);

      if (response && Array.isArray(response)) setCharacters(response);
    } catch (error) {}
  }

  async function getVideosByTv(signal) {
    try {
      const response = await axios
        .get(url_tv_videos, signal)
        .then((res) => res?.data?.results);

      if (response && Array.isArray(response)) setVideos(response);
    } catch (error) {}
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getActorsByTv(opts);
    getVideosByTv(opts);

    return () => abortCtrl.abort();
  }, [tv]);

  const getYoutubeLink = () => {
    const video = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return video ? `https://www.youtube.com/embed/${video.key}?rel=0` : null;
  };

  useEffect(() => {
    // Do only if characters is not empty and actors is empty for use only once time
    if (characters.length > 0 && actors.length === 0) {
      //find the 3 pincipals 'actors' of the movie
      const actors = characters
        ?.filter((c) => c.known_for_department === "Acting")
        ?.slice(0, 3);
      setActors(actors);
    }
    window.scrollTo(0, 100);
  }, [characters]);

  return (
    <>
      <div
        className="movie flex flex-col justify-center items-center"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${
            tv.backdrop_path
              ? "https://image.tmdb.org/t/p/original" + tv.backdrop_path
              : "https://via.placeholder.com/1920x1080/000000"
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* card */}
        {Object.keys(tv).length ? (
          <Card type="tv" data={tv} actors={actors} videos={videos} />
        ) : null}
      </div>
    </>
  );
};

export default Tv;
