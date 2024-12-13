import React, { useState, useEffect } from 'react';

const MovieDetails = ({ imdbID, onBack }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=5fdac33d`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, [imdbID]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-8">
                    <h2>{movie.Title}</h2>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
                    <button
                        onClick={onBack}
                        className="btn btn-secondary"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;