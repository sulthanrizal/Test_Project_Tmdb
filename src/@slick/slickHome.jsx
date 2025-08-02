import { useEffect, useState } from "react";
import "./slickHome.scss";
import { getMovieTrending } from "../axios";
import { Link } from "react-router-dom";

export default function SlickHome({ imgUrl }) {
  const [movie, setMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getMovieTrending(setMovie);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="manual-slider-container" id="slick-container">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movie.slice(0, 3).map((item, index) => {
          const title = item?.title;
          const overview = item?.overview;
          const img = item?.backdrop_path;
          return (
            <div key={index} className="home">
              <Link to={`/view-movie/${item?.id}`} className="img-link">
                <img src={`${imgUrl}${img}`} alt="Movie Poster" />
                <div className="text-img">
                  <p className="title">{title}</p>
                  <p className="deskripsion">{overview}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
