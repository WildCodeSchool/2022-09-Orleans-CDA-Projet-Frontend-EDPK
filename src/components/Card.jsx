import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <div className="p-6 flex flex-col justify-start items-center">
            <h5 className="text-gray-900 text-3xl font-medium mb-2 text-center">
              {type === "movie" ? data.title : data.name}{" "}
              {data.adult ? "interdit au moins de 18 ans" : ""}
            </h5>

            <Categories type={type} data={data} />

            <p className="text-gray-400 py-2">
              release date : {data.release_date}
            </p>
            <p className="text-gray-600 text-base mb-4">
              <b>Overview : </b>
              {data.overview}
            </p>
            <hr />
            <p className="text-gray-600 p-4">
              Average rating : {data.vote_average}
            </p>
            <hr />
            <br />
            {/** view actors */}

            <div className="items-center">
              <div className="flex items-center space-x-2 text-base">
                <h4 className="font-semibold text-slate-900">Main actors :</h4>
              </div>
              <div className="mt-3 mr-4 p-4 flex overflow-hidden">
                {actors?.map((c) => (
                  <Link to={`/person/${c.id}`} key={c.id}>
                    <div className="relative mr-6 hover:scale-125">
                      <img
                        id={c.id}
                        className={
                          "inline-block transition duration-20 ease-in-out shadow-inner border rounded-lg max-w-full h-auto"
                        }
                        data-bs-toggle="tooltip"
                        title={c.name}
                        src={"https://image.tmdb.org/t/p/w500" + c.profile_path}
                        alt={c.name}
                      />
                      <div
                        id={"text-" + c.id}
                        className={
                          "absolute bottom-0 left-0 right-0 px-2 py-2 bg-gray-800 opacity-70"
                        }
                      >
                        <p className="text-xs text-white font-bold">{c.name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {type === "tv" ? (
              data.seasons ? (
                <div>
                  <p className="text-gray-600 p-4">
                    Number of seasons :{" "}
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
