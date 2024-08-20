import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const genres = [
  'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
];

// Mock data for user's watchlist
const initialWatchlist = [
  { id: 1, title: 'Inception', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 2, title: 'The Matrix', poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
];

export default function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState(initialWatchlist);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, genres: selectedGenres }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleRemoveFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>Profile - MovieBuddy</title>
      </Head>
      <header className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-red-600">MovieBuddy</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-red-600 transition duration-300">Home</Link></li>
              <li><Link href="/auth/login" className="hover:text-red-600 transition duration-300">Login</Link></li>
              <li><Link href="/auth/signup" className="hover:text-red-600 transition duration-300">Sign Up</Link></li>
              <li><Link href="/profile" className="hover:text-red-600 transition duration-300">Profile</Link></li>
              <li><Link href="/watchlist" className="hover:text-red-600 transition duration-300">Watchlist</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400">Favorite Genres</label>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">{genre}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full transition duration-300"
            >
              Save Changes
            </button>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </form>
        </div>

        <div className="bg-gray-900 p-8 mt-10 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Your Watchlist</h2>
          <ul className="space-y-4">
            {watchlist.map((movie) => (
              <li key={movie.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <Link href={`/movie/${movie.id}`} className="flex items-center space-x-4">
                  <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} className="w-16 h-24 rounded" />
                  <span className="text-xl text-white">{movie.title}</span>
                </Link>
                <button
                  onClick={() => handleRemoveFromWatchlist(movie.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MovieBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
