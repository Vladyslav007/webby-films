import React from 'react'

export const FilmsList = ({ films, jumpHandler }) => {

    if (!films.length) {
        return <p className="center indent">Фильмов пока нет</p>
    }

    return (
        <div className="indent">
            <div className="row">
                { films.map( film => {
                    return (
                        <div className="col s12 m4" key={film._id}>
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{film.title}</span>
                                    <p>Год выпуска: {film.releaseYear}</p>
                                    <p>Формат: {film.format}</p>
                                </div>
                                <div className="card-action">
                                    <button onClick={jumpHandler} id={film._id} className="btn">Открыть</button>
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