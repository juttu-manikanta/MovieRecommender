import React, { useMemo } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onAddToWatchlist, onRemoveFromWatchlist, watchlist }) => {
  // Use a Set for efficient ID lookups
  const watchlist_ids = useMemo(() => new Set(watchlist.map(m => m.id)), [watchlist]);

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-400 col-span-full mt-10">No movies found. Try a different search or filter!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          is_in_watchlist={watchlist_ids.has(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
