import { useEffect, useState } from 'react';
import './App.css';
import Movie from './components/Movie';

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";



const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);


  const getMovies = (API) => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setMovies(data.results)
      })
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    if (setSearchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('')
    };
  }

  const handleOnChange = e => {
    setSearchTerm(e.target.value)
  }

  return (

    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className='search' type="search" placeholder='search....' value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>
      <div className='movie-container'>
        {
          movies.length > 0 && movies.map(movie => <Movie movie={movie} key={movie.id}></Movie>)
        }
      </div></>
  );
}

export default App;



// 22.57 sec