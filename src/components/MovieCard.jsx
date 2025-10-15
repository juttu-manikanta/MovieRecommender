import React from 'react';
import { IMAGE_BASE_URL } from '../services/movieApi';

const MovieCard = ({ movie, onAddToWatchlist, onRemoveFromWatchlist, is_in_watchlist }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : `https://placehold.co/500x750/1f2937/a3a3a3?text=${movie.title.split(' ').join('+')}`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group">
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/500x750/1f2937/a3a3a3?text=Image+Not+Found`; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <p className="text-gray-300 text-sm max-h-24 overflow-y-auto">{movie.overview}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate" title={movie.title}>{movie.title}</h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span>{movie.release_date?.substring(0, 4)}</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        {is_in_watchlist ? (
          <button
            onClick={() => onRemoveFromWatchlist(movie.id)}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            onClick={() => onAddToWatchlist(movie)}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
