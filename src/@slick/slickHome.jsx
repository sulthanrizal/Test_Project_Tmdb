import React, { useEffect, useState } from "react";
import './slickHome.scss'
import { getMovieTrending } from "../axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
function SlickHome({ imgUrl }) {

    const [movie, setMovie] = useState([])
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);

    var settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: current => setActiveSlide2(current)
    };


    useEffect(() => {
        getMovieTrending(setMovie)
    }, [])

    return (
        <div className="slider-container" id="slick-container">
            <Slider {...settings} className="slider">
                {
                    movie.slice(0, 3).map((item, index) => {
                        const title = item?.title
                        const overview = item?.overview
                        const img = item?.backdrop_path
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
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default SlickHome;