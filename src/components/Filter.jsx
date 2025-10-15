import React from 'react';

const Filters = ({ selectedGenre, setSelectedGenre, genres }) => (
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    className="w-full sm:w-auto bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
  >
    <option value="">All Genres</option>
    {genres.map(genre => (
      <option key={genre.id} value={genre.id}>{genre.name}</option>
    ))}
  </select>
);

export default Filters;

