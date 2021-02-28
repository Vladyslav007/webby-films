import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useParams, useHistory} from "react-router-dom";
import {ResultFilmsList} from "../components/ResultFilmsList";
import {FilmsContext} from "../context/FilmsContext";
import {Preloader} from "../components/Preloader";

export const SearchResultPage = () => {
    const context = useContext(FilmsContext)
    const history = useHistory()
    const [films, setFilms] = useState([])
    const {request, loading} = useHttp()
    const queryStr = useParams().queryStr

    const fetchFilms = useCallback(async () => {
        try {
            const fetched = await request(`/api/films/search/${context.queryString}`, 'GET')
            setFilms(fetched)
        } catch (e) {

        }
    }, [request])


    useEffect(() => {
        fetchFilms()
    }, [fetchFilms, context.queryString])

    const jumpHandler = (event) => {
        history.push(`/detail/${event.target.id}`)
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <ResultFilmsList films={films} jumpHandler={jumpHandler}/>
        </>
    )
}