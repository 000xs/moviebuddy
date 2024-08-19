import axios from 'axios';

// Replace with your TMDb API key
const API_KEY = '71c88b5032d53f509fe0198ff99bd84b';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: 'en-US',
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
