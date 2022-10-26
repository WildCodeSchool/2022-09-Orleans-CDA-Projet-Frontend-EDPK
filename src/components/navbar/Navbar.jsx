import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import axios from "axios";

const Navbar = () => {
  const [isShow, setShow] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (category.length === 0) {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        )
        .then((response) => response.data)
        .then((data) => {
          setCategory(data.genres);
        });
    }
  }, []);

  return (
    <div>
      {isShow ? (
        <div onClick={() => setShow(!isShow)} className="backdrop"></div>
      ) : null}
      <nav className="border-b-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-24 items-center justify-between ">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setDrawerOpen(!isDrawerOpen)}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="/images/logo.png"
                  alt="CineFlix"
                />
              </div>
              <div
                className={`${
                  isDrawerOpen ? "hidden" : "block"
                } sm:ml-6 sm:block`}
              >
                <div className="flex space-x-4">
                  <ul>
                    <li>
                      <Link
                        to="/"
                        className="titles text-xl inline-flex hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Home
                      </Link>
                    </li>
                    <div className="relative inline-block text-left">
                      <div>
                        <li
                          onClick={() => setShow(!isShow)}
                          type="button"
                          className="titles text-xl inline-flex w-full rounded-md px-4 py-2 font-medium hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          id="menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          Movies
                          <svg
                            className="-mr-1 ml-2 h-5 w-5 self-center"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </li>
                      </div>

                      <div
                        className={`${
                          isShow
                            ? "transition ease-out duration-100 transform opacity-100 scale-100"
                            : "transition ease-in duration-75 transform opacity-0 scale-95 hidden"
                        } w-full sm:w-auto md:w-auto absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div
                          onClick={() => setShow(!isShow)}
                          className="dropdown overflow-y-auto h-96 rounded border-l border-r border-b py-1 text-white"
                          role="none"
                        >
                          {category &&
                            category.map((genre) => (
                              <div className="m-4" key={genre.id}>
                                <Link to={`/category/${genre.id}/1`}>
                                  {genre.name}
                                </Link>
                              </div>
                            ))}
                          {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">{category}</a> */}
                        </div>
                      </div>
                    </div>

                    <li>
                      <Link
                        to="/"
                        className="titles text-xl inline-flex hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        TV Shows
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/quiz/"
                        className="titles text-xl inline-flex hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Quiz
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
