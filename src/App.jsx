import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies, searchMovies, GENRES } from './services/movieApi';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Load watchlist from local storage on initial render
  useEffect(() => {
    try {
      const storedWatchlist = JSON.parse(localStorage.getItem('movie-watchlist'));
      if (storedWatchlist) {
        setWatchlist(storedWatchlist);
      }
    } catch (e) {
      console.error("Failed to parse watchlist from localStorage", e);
    }
  }, []);

  // Save watchlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('movie-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch movies based on search term or load popular movies
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      setError(null);
      try {
        let results;
        if (debouncedSearchTerm) {
          results = await searchMovies(debouncedSearchTerm);
        } else {
          results = await getPopularMovies();
        }
        setMovies(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApiData();
  }, [debouncedSearchTerm]);

  // Watchlist management functions
  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };
  
  // Memoized filtering logic
  const filterMoviesByGenre = useCallback((movieList) => {
      if (!selectedGenre) return movieList;
      return movieList.filter(movie => movie.genre_ids?.includes(parseInt(selectedGenre)));
  }, [selectedGenre]);

  const displayedMovies = useMemo(() => filterMoviesByGenre(movies), [movies, filterMoviesByGenre]);
  const displayedWatchlist = useMemo(() => filterMoviesByGenre(watchlist), [watchlist, filterMoviesByGenre]);

  // Main render logic
  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-xl mt-10">Loading movies...</div>;
    }
    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900 border border-red-500 rounded-lg p-4 max-w-2xl mx-auto mt-10">
          <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }
    const listToDisplay = activeTab === 'home' ? displayedMovies : displayedWatchlist;
    return (
      <MovieList
        movies={listToDisplay}
        onAddToWatchlist={addToWatchlist}
        onRemoveFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={GENRES}
      />
      <main className="container mx-auto px-4 pb-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
