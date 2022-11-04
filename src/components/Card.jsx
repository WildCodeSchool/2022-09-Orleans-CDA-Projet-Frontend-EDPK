import React, { useState } from "react";
import Carousel from "./carousel/Carousel";
import Categories from "./Categories";
import Videoplayer from "./Videoplayer";

function Card({ type, data, actors, videos }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:max-w-5xl rounded-lg bg-white shadow-lg md:my-20 shadow-2xl">
          <Videoplayer videos={videos} />

          <img
            className=" w-full h-96 md:h-auto object-cover md:w-90 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : ""
            }
            alt=""
          />
          <div className="p-6 flex flex-col justify-start items-center w-full">
            <h5 className="text-gray-900 text-3xl font-medium mb-2 text-center">
              {type === "movie" ? data.title : data.name}{" "}
            </h5>

            <Categories type={type} data={data} />

            <p className="text-gray-400 py-2">
              {data.release_date && `release date: ${data.release_date}`}
            </p>
            <p className="text-gray-600 text-base mb-4 w-full">
              <b>Overview: </b>
              {data.overview
                ? data.overview
                : "No overview available for this " +
                  (type === "movie" ? "movie" : "tv show")}
            </p>
            <hr />
            <p className="text-gray-600 p-4">
              {data.vote_average > 0 &&
                `Average rating: ${data.vote_average} / 10`}
            </p>
            <hr />
            <br />
            {/** view actors */}

            <div className="items-center">
              <div className="flex items-center space-x-2 text-base">
                <h4 className="font-semibold text-slate-900">Main actors :</h4>
              </div>
              <Carousel actors={actors} />
            </div>
            {type === "tv" ? (
              data.seasons ? (
                <div className="mt-4">
                  <p className="text-gray-600 p-4">
                    Number of seasons:&nbsp;
                    {
                      data.seasons.filter((s) => s.name.includes("Season"))
                        .length
                    }
                  </p>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
