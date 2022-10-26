import React, { useEffect, useState } from "react";
import "./tv.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        id="video-player"
        class={`relative z-10 ${videoPlayer ? "" : "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div
          class="fixed inset-0 z-10 overflow-y-auto"
          onClick={() => setVideoPlayer(!videoPlayer)}
        >
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <iframe
              width="560"
              height="315"
              src={videoPlayer ? getYoutubeLink() : null}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
            ></iframe>
          </div>
        </div>
      </div>

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
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row md:max-w-5xl rounded-lg bg-white shadow-lg md:my-20 shadow-2xl">
            {getYoutubeLink() ? (
              <div className="absolute w-full h-96 md:h-auto object-cover md:w-90 rounded-t-lg md:rounded-none md:rounded-l-lg">
                <button
                  type="button"
                  class="my-96 ml-44 inline-block align-middle px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => setVideoPlayer(!videoPlayer)}
                >
                  <span className="">Watch Trailer </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 inline-block align-middle"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            <img
              className="w-full h-96 md:h-auto object-cover md:w-90 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={
                tv.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                  : ""
              }
              alt=""
            />

            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-3xl font-medium mb-2 text-center">
                {tv.name}
              </h5>

              <ul className="py-2 flex flex-row">
                {tv.genres?.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    {g.name}
                  </button>
                ))}
              </ul>

              <p className="text-gray-400 py-2">
                release date : {tv.release_date}
              </p>
              <p className="text-gray-600 text-base mb-4">
                <b>Overview : </b>
                {tv.overview}
              </p>
              <hr />
              <p className="text-gray-600 p-4">
                Average rating : {tv.vote_average}
              </p>
              <hr />
              <br />
              {/** view actors */}

              <div className="items-center">
                <div className="flex items-center space-x-2 text-base">
                  <h4 className="font-semibold text-slate-900">
                    Main actors :
                  </h4>
                </div>
                <div className="mt-3 mr-4 p-4 flex overflow-hidden">
                  {actors?.map((c) => (
                    <div key={c.id} className="relative mr-6 hover:scale-125">
                      <img
                        id={c.id}
                        className={
                          "inline-block transition duration-20 ease-in-out shadow-inner border rounded-lg max-w-full h-auto "
                        }
                        data-bs-toggle="tooltip"
                        title={c.name}
                        src={"https://image.tmdb.org/t/p/w500" + c.profile_path}
                        alt={c.name}
                      />
                      <div
                        id={"text-" + c.id}
                        className={
                          "absolute bottom-0 left-0 right-0 px-2 py-2 bg-gray-800 opacity-70 "
                        }
                      >
                        <p className="text-xs text-white font-bold">{c.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600 p-4">
                  Number of seasons : {tv.seasons?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tv;
