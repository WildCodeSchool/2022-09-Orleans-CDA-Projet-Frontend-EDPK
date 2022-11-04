import React, { useState } from "react";

const VideoPlayer = (props) => {
  const { videos } = props;
  const [videoPlayer, setVideoPlayer] = useState(false);

  const getYoutubeLink = () => {
    const video = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return video ? `https://www.youtube.com/embed/${video.key}?rel=0` : null;
  };

  return (
    <>
      {getYoutubeLink() ? (
        <>
          <div
            id="video-player"
            className={`relative z-10 ${videoPlayer ? "" : "hidden"}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              onClick={() => setVideoPlayer(!videoPlayer)}
            >
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <iframe
                  width="560"
                  height="315"
                  src={videoPlayer ? getYoutubeLink() : null}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen="allowfullscreen"
                  mozallowfullscreen="mozallowfullscreen"
                  msallowfullscreen="msallowfullscreen"
                  oallowfullscreen="oallowfullscreen"
                  webkitallowfullscreen="webkitallowfullscreen"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-96 text-center md:h-auto object-cover md:w-40 rounded-t-lg md:rounded-none md:rounded-l-lg">
            <button
              type="button"
              className="md:mt-96 mt-48 ml-25 md:ml-44 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => setVideoPlayer(!videoPlayer)}
            >
              <span className="">Watch Trailer </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block align-middle"
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
        </>
      ) : null}
    </>
  );
};

export default VideoPlayer;
