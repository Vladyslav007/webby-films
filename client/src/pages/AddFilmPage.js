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

    const updateSelect = () => {
        let elems = document.querySelectorAll('select')
        let options = document.querySelectorAll('option')
        window.M.FormSelect.init(elems, options)
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
        updateSelect()
    }, [])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const starsDuplicates = (values, set) => values.some((star) => {
        return set.size === set.add(star).size
    })

    const addFilmHandler = async () => {
        try {
            let set = new Set()
            if (form.format === "" || form.stars === "" || form.title === "" || form.releaseYear === "") {
                message('Заполните все поля')
            } else if (form.releaseYear < 1850 || form.releaseYear > 2020 || isNaN(Number(form.releaseYear))) {
                message('Невалидный год выпуска: допустимые значения от 1850 до 2020 гг.')
            } else if (starsDuplicates(form.stars.split(', '), set)) {
                message('Фильм не может содержать двух идентичных актеров')
                set.clear()
            } else {
                const data = await request('/api/films/add', 'POST', {...form, stars: form.stars.split(', ')})
                message(data.message)
                setForm({
                    title: '',
                    releaseYear: '',
                    stars: [],
                    format: ''
                })
                updateSelect()
            }
        } catch (e) {
            
        }
    }


    return (
        <div className="row indent">
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
                                placeholder="Введите актеров через запятую и пробел"
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
                            <select
                                id="format"
                                name="format"
                                value={form.format}
                                className="validate"
                                autoComplete="off"
                                onChange={changeHandler}
                            >
                                <option value="" disabled selected>Выберите формат фильма</option>
                                <option value="VHS">VHS</option>
                                <option value="DVD">DVD</option>
                                <option value="Blu-Ray">Blu-Ray</option>
                            </select>
                            <label>Формат</label>
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