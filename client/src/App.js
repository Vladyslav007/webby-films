import React from 'react'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import 'materialize-css'
import {FilmsPage} from "./pages/FilmsPage";
import {DetailFilmPage} from "./pages/DetailFilmPage";
import {AddFilmPage} from "./pages/AddFilmPage";
import {Navbar} from "./components/Navbar";
import {SearchResultPage} from "./pages/SearchResultPage";
import {FilmsContext} from "./context/FilmsContext";

function App() {
    return (
        <FilmsContext.Provider value={{queryString: null, films: null}}>
            <BrowserRouter>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact>
                            <FilmsPage/>
                        </Route>
                        <Route path="/detail/:id">
                            <DetailFilmPage/>
                        </Route>
                        <Route path="/add" exact>
                            <AddFilmPage/>
                        </Route>
                        <Route path="/search/:queryStr">
                            <SearchResultPage/>
                        </Route>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </BrowserRouter>
        </FilmsContext.Provider>
    )
}

export default App;
