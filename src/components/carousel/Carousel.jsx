import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";

const CarouselActors = ({ actors }) => {
  const urlPhoto = "https://image.tmdb.org/t/p/w500";

  const [current, setCurrent] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const length = actors.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      if (!mouseOver)
        setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length, mouseOver]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(actors) || actors.length <= 0) {
    return null;
  }

  const ActorsCards = () => {
    return [...Array(3)].map((_, i) => (
      <Link
        to={`/person/${actors[(current + i) % length].id}`}
        key={actors[(current + i) % length].id}
      >
        <div className="carousel-container-slide hover:scale-105 m-1">
          <div className="carousel-container-slide-img">
            <img
              src={urlPhoto + actors[(current + i) % length].profile_path}
              alt={actors[(current + i) % length].name}
            />
          </div>
          <div className="carousel-container-slide-text">
            <p className="ml-1 mr-1 text-center">
              {actors[(current + i) % length].name}
            </p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <section
      className="carousel"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div
        id="carousel"
        className="carousel-container flex flex-row justify-center carousel slide carousel-fade relative w-5/5"
        data-bs-ride="carousel"
      >
        <ActorsCards />

        <button
          className="carousel-control-prev hover:opacity-40 absolute top-10 md:top-20 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          onClick={prevSlide}
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next hover:opacity-40 absolute top-10 md:top-20 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          onClick={nextSlide}
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
};
export default CarouselActors;
