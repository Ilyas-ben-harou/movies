import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link,Outlet } from 'react-router-dom'

const SearchMovie = (props) => {
    const [searchValue, setSearchValue] = useState(undefined)
    const [byYear, setByYear] = useState(undefined)
    
    const films =props.films

    const handleSearch=(e)=>{
        
        let inputValue=document.querySelector('#searchInput').value
        if (inputValue) {
            setSearchValue(inputValue)

        }else{
            alert("Veuillez saisir un titre")
        }
    }

    

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
            return filmsTmp.map((film) => {
                return (
                    <Link 
                        key={film.imdbID} 
                        
                        className='movie-card col-auto bg-light text-decoration-none text-dark'
                        to={`/singleMovie/${film.imdbID}`}
                    >
                        <div className='movie-item' style={{width:'290px'}}>

                            <img 
                                src={film.Poster} 
                                width='270px'
                                height='400px'
                                className='movie-poster hover-zoom' 
                                alt={`Poster for ${film.Title}`} 
                            />
                            <h5 className='movie-title '>{film.Title}</h5>
                            <span className='movie-year'>{film.Year}</span>
                        </div>
                    </Link>
                );
            });
        }
    }

    // If a movie is selected, show its details
    

    return (
        <div>
            <div className='bg-dark text-white'>
                <div className=' row w-100 align-items-center justify-content-between'>
                    <h3 className='col-2'>Search by title</h3>
                    <input type="text" id='searchInput' placeholder="Search Movie" className='col-5 '/>
                    <button onClick={handleSearch} className='col-2 btn btn-secondary'>Search</button>
                    <button onClick={()=>{setSearchValue(undefined)}} className='col-2 btn btn-secondary'>Reset</button>
                </div>

                <div className='row w-100 align-items-center justify-content-aro'>
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
            <div className='row justify-content-around w-100 align-items-center my-3'>
                {
                    displayFilms()
                }
            </div>
            <Outlet/>
        </div>
                    
        
    )
}


export default SearchMovie
