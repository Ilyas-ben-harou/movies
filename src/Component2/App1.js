import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchMovie from './SearchMovie'
import SingleMovie from './SingleMovie';
import { useMovieApi } from './Api';

const App1 = () => {
    const { movies, loading, error } = useMovieApi();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading movies</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path='/' element={<SearchMovie films={movies}/>} />
                    <Route path='/singleMovie/:id' element={<SingleMovie films={movies}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App1