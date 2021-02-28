import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {FilmsList} from "../components/FilmsList";
import {useMessage} from "../hooks/message.hook";

export const FilmsPage = () => {
    const history = useHistory()
    const [films, setFilms] = useState([])
    const {request} = useHttp()
    const message = useMessage()

    const fetchFilms = useCallback(async () => {
        try {
            const fetched = await request('api/films', 'GET')
            setFilms(fetched)
        } catch (e) {
            
        }
    }, [request])

    const jumpHandler = (event) => {
        history.push(`detail/${event.target.id}`)
    }

    const sortByField = (field) => {
        return (a, b) => a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1;
    }

    films.sort(sortByField('title'))


    const addFilmHandler = async (title, releaseYear, stars, format) => {
        try {
            await request('/api/films/add', 'POST', {title, releaseYear, format, stars})
        } catch (e) {
            message(`Фильм ${title} уже сущуствует`)
        }
    }


    const uploadFile = (e) => {
        let selectedFile = e.target.files[0]
        let reader = new FileReader()

        if (selectedFile) {
            reader.readAsText(selectedFile)
        }
        reader.onload = () => {
            let textObj = reader.result.split('\n\n')
            let newObj = []
            for (let i = 0; i < textObj.length; i++) {
                if (textObj[i] !== '') {
                    newObj[i] = textObj[i].split('\n')
                }
            }
            for (let i = 0; i < newObj.length; i++) {
                let { title, releaseYear, stars, format } = ''
                for (let j = 0; j < newObj[i].length; j++) {
                    if (newObj[i][j].split(':')[0] === 'Title') {
                        title = newObj[i][j].split(': ')[1]
                    }
                    if (newObj[i][j].split(':')[0] === 'Release Year') {
                        releaseYear = newObj[i][j].split(': ')[1]
                    }
                    if (newObj[i][j].split(':')[0] === 'Format') {
                        format = newObj[i][j].split(': ')[1]
                    }
                    if (newObj[i][j].split(':')[0] === 'Stars') {
                        stars = newObj[i][j].split(': ')[1].split(', ')
                    }
                }
                addFilmHandler( title, releaseYear, stars, format )
            }
            message('Фильмы успешно импортированы')
            fetchFilms()
        }
    }
    const openUpload = () => {
        document.getElementById('load').click()
    }


    useEffect(() => {
        fetchFilms()
    }, [fetchFilms])

    return (
        <>
            <div className="row">
                <button style={{marginTop: '2rem'}} className="btn" onClick={openUpload}>Импорт</button>
                <input id="load" onChange={uploadFile} style={{display: 'none'}} type="file" name="list"
                       accept=".txt"/>
            </div>
            <FilmsList films={films} jumpHandler={jumpHandler}/>
        </>
    )
}