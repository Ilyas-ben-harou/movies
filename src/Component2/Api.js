import { useState, useEffect } from "react";

export function useMovieApi() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://www.omdbapi.com/?s=avengers&apikey=5fdac33d');
                const data = await response.json();
                
                setMovies(data.Search || []);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading, error };
}