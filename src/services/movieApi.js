// --- Configuration ---
// IMPORTANT: Replace with your own TMDB API key.
const API_KEY = 'API_KEY';
const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  if (API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    throw new Error('Please replace "YOUR_TMDB_API_KEY_HERE" with your actual TMDB API key in src/services/movieApi.js');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error; // Re-throw the error to be handled by the component
  }
};

export const getPopularMovies = () => fetchMovies(`/movie/popular?api_key=${API_KEY}`);

export const searchMovies = (query) => fetchMovies(`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

export const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
];

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
