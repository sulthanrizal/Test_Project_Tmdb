import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetailsMovie } from "../../axios";
import './index.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import LocalStorage from "./localStroage/localStorage";

const DetailsMovie = () => {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [runtimeLast, setRuntimeLast] = useState([])
    const imgUrl = 'https://image.tmdb.org/t/p/original'
    const imgPoster = data?.poster_path
    const overview = data?.overview
    const title = data?.title
    const date = data?.release_date.split('-').slice().reverse().join('-')
    const dateEdit = data?.release_date.split('-')[0]
    const runtimeStart = data?.runtime
    const genres = data?.genres || []
    const country = data?.origin_country || []
    const rate = data?.vote_average


    useEffect(() => {
        getDetailsMovie(id, setData)
        if (runtimeStart != null) {
            const hours = Math.floor(runtimeStart / 60);
            const minutes = runtimeStart % 60;
            setRuntimeLast(`${hours}h ${minutes}m`);
        } else {
            setRuntimeLast("Runtime tidak tersedia.");
        }

    }, [runtimeStart])

    return (
        <div className="details-movie-container" id="details-container">
            <div className="details-movie">
                <div className="img">
                    <img src={`${imgUrl}${imgPoster}`} />
                    <img src={`${imgUrl}${imgPoster}`} className="poster" />
                </div>
                <div className="text">
                    <div className="text-header">
                        <p className="title">{title}</p>
                    </div>
                    <div className="text-body">
                        <div className="body-1">
                            <div className="genres">
                                {
                                    genres.map((item, index) => {
                                        const nameGenres = item?.name
                                        return (
                                            <p key={index} className="text-genres"> {nameGenres}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className="release-date">
                                <FontAwesomeIcon icon={faCalendarDays} className="icon-calender" />
                                <p className="date">({dateEdit})</p>
                            </div>
                            <div className="runtime">
                                <FontAwesomeIcon icon={faClock} className="icon-clock" />
                                <p className="text-runtime">{runtimeLast}</p>
                            </div>
                            <div className="rate">
                                <FontAwesomeIcon icon={faStar} className="icon-star" />
                                <p className="text-rate">{rate}</p>
                            </div>
                        </div>
                        <div className="body-2">
                            <p className="overview">{overview}</p>
                        </div>
                    </div>
                    <div className="text-footer">
                        <div className="column country">
                            <div className="text-left">
                                <p className="text-title">Country</p>
                                <p className="text-equalst">:</p>
                            </div>
                            <div className="text-right">
                                {
                                    country.map((item, index) => {
                                        return (
                                            <p key={index} className="text-content"> ({item})</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="column date">
                            <div className="text-left">
                                <p className="text-title">Date Release</p>
                                <p className="text-equals">:</p>
                            </div>
                            <div className="text-right">
                                <p className="text-content">{date}</p>
                            </div>
                        </div>
                        <div className="column genres">
                            <div className="text-left">
                                <p className="text-title">Genres </p>
                                <p className="text-equals">:</p>
                            </div>
                            <div className="text-right">
                                <p className="text-content">
                                    {
                                        genres.map((item, index) => {
                                            const nameGenres = item?.name;
                                            const isLast = index === genres.length - 1;
                                            return (
                                                <span key={index} className="text-genres">
                                                    {isLast ? nameGenres : `${nameGenres}, `}
                                                </span>
                                            );
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="riview-flim">
                <LocalStorage movieName={title} />
            </div>
        </div>
    )
}
export default DetailsMovie;