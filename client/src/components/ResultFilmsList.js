import React from 'react'
import {useHistory} from "react-router-dom";

export const ResultFilmsList = ({ films, jumpHandler }) => {
    const history = useHistory()
    return (
        <div style={{marginTop: '2rem'}}>
            <div className="row">
                { films.map( film => {
                    return (
                        <div className="col s12 m4" key={film._id}>
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{film.title}</span>
                                    <p>Год выпуска: {film.releaseYear}</p>
                                    <p>Формат: {film.format}</p>
                                    <p>Актеры: {film.stars.join(',')}</p>
                                </div>
                                <div className="card-action">
                                    <button onClick={() => history.push(`/detail/${film._id}`)} id={film._id} className="btn">Открыть</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}