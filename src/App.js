import { useEffect, useState } from 'react';
import { OMDB_KEY } from './DevVariables';
import { NavBar } from './Components/NavBar';
import { NumResults } from './Components/NumResults';
import { Search } from './Components/Search';
import { Main } from './Components/Main';
import { Box } from './Components/Box';
import { MovieList } from './Components/MovieList';
import { MovieDetails } from './Components/MovieDetails';
import { WatchedSummary } from './Components/WatchedSummary';
import { WatchedMovieList } from './Components/WatchedMovieList';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  /* //---------- Examples of how the useEffect and dependency array work ----------------
  useEffect(function () {
    console.log('After intial render');
  }, []);

  useEffect(function () {
    console.log('After every render');
  });
  console.log('During Render');

  useEffect(
    function () {
      console.log('D');
    },
    [query]
  );
*/
  function handleSelectMovie(id) {
    setSelectedId(i => (i === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(w => [...w, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(w => w.filter(w => w.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`
          );
          if (!res.ok) throw new Error('Something went wrong');
          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}
