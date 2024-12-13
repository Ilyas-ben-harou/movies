import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieDetails from './MovieDetails'

const SearchMovie = () => {
    const [films, setFilms] = useState([])
    const [searchValue, setSearchValue] = useState(undefined)
    const [byYear, setByYear] = useState(undefined)
    const [selectedMovie, setSelectedMovie] = useState(null)

    const handleSearch=(e)=>{
        
        let inputValue=document.querySelector('#searchInput').value
        if (inputValue) {
            setSearchValue(inputValue)

        }else{
            alert("Veuillez saisir un titre")
        }
    }

    useEffect(() => {
        setTimeout(() => {

            fetch('http://www.omdbapi.com/?s=avengers&apikey=5fdac33d')
                .then(response => response.json())
                .then(response => setFilms(response.Search))
                .catch(console.error('error'))


        }, 1000);

    }, [])

    const displayFilms = () => {
        let filmsTmp = films;
        if (searchValue !== undefined) {
            filmsTmp = filmsTmp.filter(item => item.Title.toLowerCase().includes(searchValue.toLowerCase()));
        }
        if (byYear !== undefined) {
            filmsTmp = filmsTmp.filter(item => item.Year.includes(byYear));
        }
        if (filmsTmp.length === 0) {
            return (
                <div className="container">
                    <h4>no films</h4>
                </div>
            );
        } else {
            return filmsTmp.map((film, index) => {
                return (
                    <button 
                        key={film.imdbID} 
                        style={{backgroundColor:'white'}} 
                        className='movie-card col-4 border-0'
                        onClick={() => setSelectedMovie(film.imdbID)}
                    >
                        <div className='movie-item'>
                            <img 
                                src={film.Poster} 
                                className='movie-poster' 
                                alt={`Poster for ${film.Title}`} 
                            />
                            <h5 className='movie-title'>{film.Title}</h5>
                            <span className='movie-year'>{film.Year}</span>
                        </div>
                    </button>
                );
            });
        }
    }

    // If a movie is selected, show its details
    if (selectedMovie) {
        
        return (
            <MovieDetails
                imdbID={selectedMovie} 
                onBack={() => setSelectedMovie(null)} 
            />
        );
    }

    return (
        <div>
            <div className='bg-dark text-white'>
                <div className=' row w-100 align-items-center justify-content-between'>
                    <h3 className='col-2'>Search by title</h3>
                    <input type="text" id='searchInput' placeholder="Search Movie" className='col-5 '/>
                    <button onClick={handleSearch} className='col-2 btn btn-secondary'>Search</button>
                    <button onClick={()=>{setSearchValue(undefined)}} className='col-2 btn btn-secondary'>Reset</button>
                </div>

                <div className='row w-100 align-items-center justify-content-between'>
                    <h3 className='col-2'>Search by year</h3>
                    <select name="" className=' col-3' id=""
                        onChange={(e)=>setByYear(e.target.value)
                        }
                    >
                        <option selected={byYear===undefined}>Select year</option>
                        {
                            films.map((item, index) => <option value={item.Year} key={index}>{item.Year}</option> )
                        }
                    </select>
                    <button onClick={()=>{setByYear(undefined)}} className='col-2 btn btn-secondary'>Reset</button>
                    
                </div>
                
            </div>
            <div className='row w-100 align-items-center justify-content-around m-3'>
                {
                    displayFilms()
                }
            </div>

        </div>
    )
}


export default SearchMovie
