import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useParams, useHistory} from "react-router-dom";
import {ResultFilmsList} from "../components/ResultFilmsList";
import {FilmsContext} from "../context/FilmsContext";

export const SearchResultPage = () => {
    const context = useContext(FilmsContext)
    const history = useHistory()
    const [films, setFilms] = useState([])
    const {request} = useHttp()
    const queryStr = useParams().queryStr

    const fetchFilms = useCallback(async () => {
        try {
            const fetched = await request(`/api/films/search/${context.queryString}`, 'GET')
            console.log(fetched)
            setFilms(fetched)
        } catch (e) {

        }
    }, [request])


    useEffect(() => {
        fetchFilms()
    }, [fetchFilms, context.queryString])

    const jumpHandler = (event) => {
        history.push(`detail/${event.target.id}`)
    }

    return (
        <>
            <ResultFilmsList films={films} jumpHandler={jumpHandler}/>
        </>
    )
}