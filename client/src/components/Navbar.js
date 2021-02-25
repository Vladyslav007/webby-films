import React, {useContext, useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {FilmsContext} from "../context/FilmsContext";

export const Navbar = () => {
    let context = useContext(FilmsContext)
    const history = useHistory()


    const [queryStr, setQueryStr] = useState('')


    const pressHandler = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            context.queryString = queryStr
            history.push(`/search/${queryStr}`)
            setQueryStr('')
            event.target.blur()
        }
    }

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{padding: '0 2rem'}}>
                <NavLink to="/" className="brand-logo">Films</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <div className="search-wrapper">
                            <input
                                id="search"
                                value={queryStr}
                                placeholder="Поиск"
                                onChange={ e => setQueryStr(e.target.value) }
                                onKeyPress={pressHandler}
                            />
                        </div>
                    </li>
                    <li><NavLink to="/add">Добавить фильм</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}