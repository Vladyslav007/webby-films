import React, {useState, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const AddFilmPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        title: '',
        releaseYear: '',
        stars: [],
        format: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addFilmHandler = async () => {
        try {
            if (form.format === "" || form.stars === "" || form.title === "" || form.releaseYear === "") {
                message('Заполните все поля')
            } else {
                const data = await request('/api/films/add', 'POST', {...form, stars: form.stars.split(',')})
                message(data.message)
                setForm({
                    title: '',
                    releaseYear: '',
                    stars: [],
                    format: ''
                })
            }
        } catch (e) {
            
        }
    }


    return (
        <div className="row" style={{marginTop: '2rem'}}>
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавте фильм</span>
                        <div className="input-field">
                            <input
                                placeholder="Введите название фильма"
                                id="filmTitle"
                                type="text"
                                name="title"
                                value={form.title}
                                className="validate"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="first_name">Название фильма</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Введите год выпуска фильма"
                                id="releaseYear"
                                type="text"
                                name="releaseYear"
                                value={form.releaseYear}
                                className="validate"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="first_name">Год выпуска</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Введите актеров через запятую"
                                id="stars"
                                type="text"
                                name="stars"
                                value={form.stars}
                                className="validate"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="first_name">Актеры</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Введите формат фильма(VHS, DVD, Blu-Ray)"
                                id="format"
                                type="text"
                                name="format"
                                value={form.format}
                                className="validate"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="first_name">Формат</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn"
                            onClick={addFilmHandler}
                            disabled={loading}
                        >Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}