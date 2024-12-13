import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';

const SingleMovie = ({films}) => {
    const {id} = useParams();
    console.log(films)
    const movie=films.filter((item)=>item.imdbID===id)
    console.log('movie',movie)
    return (
        <div className='container row justify-content-center'>
            <div className='col-5'>
                <img src={movie[0].Poster} alt={movie.Title} className='img-fluid  hover-zoom bg-image' />
            </div>
            <div className='col-7'>
                <h2 className='text-danger'>Title: {movie[0].Title}</h2>
                <p>Year: {movie[0].Year}</p>

                <Link to='/' className='btn btn-outline-secondary'>
                    Back to home
                </Link>

            </div>
        </div>
    )
}

export default SingleMovie
