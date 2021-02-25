import React, {useCallback, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {FilmCard} from "../components/FilmCard";
import {useMessage} from "../hooks/message.hook";

export const DetailFilmPage = () => {
    const history = useHistory()
    const message = useMessage()
    const {request} = useHttp()
    const [film, setFilm] = useState(null)
    const filmId = useParams().id

    const getFilm = useCallback(async () => {
        try {
            const fetched = await request(`/api/films/${filmId}`, 'GET')
            setFilm(fetched)
        } catch (e) {
            
        }
    },[request])

    const deleteFilmHandler = async () => {
        try {
            const data = await request(`/api/films/${filmId}`, 'DELETE')
            history.push('/')
            message(data.message)
        } catch (e) {

        }
    }

    useEffect(() => {
        getFilm()
    },[getFilm])
    return (
        <>
            {film && <FilmCard film={film} deleteFilmHandler={deleteFilmHandler} />}
        </>
    )
}