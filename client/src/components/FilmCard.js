import React from 'react'

export const FilmCard = ({film, deleteFilmHandler}) => {
    return (
        <div className="indent">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{film.title}</span>
                            <p>Год выпуска: {film.releaseYear}</p>
                            <p>Формат: {film.format}</p>
                            <p>Актеры: {film.stars.join(',')}</p>
                        </div>
                        <div className="card-action">
                            <button onClick={deleteFilmHandler} className="btn red darken-1">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}