import React from 'react';

// --- Sub-components defined internally to resolve import errors ---

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative w-full sm:w-64">
    <input
      type="text"
      placeholder="Search for a movie..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <svg
      className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>
);

const Filters = ({ selectedGenre, setSelectedGenre, genres }) => (
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    className="w-full sm:w-auto bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
  >
    <option value="">All Genres</option>
    {genres.map((genre) => (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    ))}
  </select>
);

// --- Main Header Component ---

const Header = ({
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  selectedGenre,
  setSelectedGenre,
  genres,
}) => {
  // Function to reset everything and go "home"
  const handleGoHome = () => {
    setActiveTab('home');
    setSearchTerm('');
    setSelectedGenre('');
  };

  return (
    <header className="bg-gray-900 sticky top-0 z-10 p-4 shadow-lg mb-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Clickable title section */}
        <button
          onClick={handleGoHome}
          className="flex items-center focus:outline-none hover:opacity-80 transition cursor-pointer"
        >
          <svg
            className="w-10 h-10 text-indigo-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-white">MovieFlix</h1>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filters
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            genres={genres}
          />
        </div>

        <div className="flex border border-gray-700 rounded-full">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-l-full text-sm font-semibold transition-colors duration-300 ${
              activeTab === 'home'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-r-full text-sm font-semibold transition-colors duration-300 ${
              activeTab === 'watchlist'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            My Watchlist
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
