// lib/api.ts
const API_KEY = '71c88b5032d53f509fe0198ff99bd84b';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
}
