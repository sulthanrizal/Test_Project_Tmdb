import "./index.scss";
// import SlickHome from "../../@slick/slickHome";
import { useEffect, useRef, useState } from "react";
import { getListMovie } from "../../axios";
import { Link } from "react-router";

const Home = () => {
  const [listMovie, setListMovie] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [keywords, setKeywords] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const inputRef = useRef();

  const handleSearch = (event) => {
    setKeywords(event.target.value);
  };

  useEffect(() => {
    getListMovie(setListMovie);
  }, []);

  useEffect(() => {
    if (keywords !== "") {
      const lowerCaseKeywords = keywords.toLowerCase();
      const result = listMovie.filter((movie) => {
        return movie.title.toLowerCase().includes(lowerCaseKeywords);
      });
      setSearchMovie(result);
    } else {
      setSearchMovie(listMovie);
    }
  }, [keywords, listMovie]);
  return (
    <div className="container-home all">
      {/* <div className="movie-trending">
        <SlickHome imgUrl={imgUrl} />
      </div> */}
      <div className="list-movie" id="listmovies">
        <div className="text-list" ref={inputRef}>
          <p className="title-list">List Movies</p>
          <div className="search-input">
            <input
              placeholder="Search Movies....."
              value={keywords}
              onChange={handleSearch}
              id="input"
            />
          </div>
        </div>
        <div className="movie-loop" id="listmovies">
          {searchMovie.length > 0 ? (
            searchMovie.map((item, index) => {
              const img = item?.backdrop_path;
              const title = item?.title;
              const date = item?.release_date.split("-");
              const dateBack = [];
              for (let i = date.length - 1; i >= 0; i--) {
                dateBack.push(date[i]);
                if (i > 0) {
                  dateBack.push("/");
                }
              }

              return (
                <div key={index} className="movie">
                  <Link
                    className="list-img-movie"
                    to={`/view-movie/${item?.id}`}
                  >
                    <img src={`${imgUrl}${img}`} />
                  </Link>
                  <div className="text-movie">
                    <div className="text-left">
                      <p className="title">{title}</p>
                    </div>
                    <div className="text-right">
                      <p className="hd">HD</p>
                      <p className="date">{dateBack}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-flim">No Movie</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
