import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for the watchlist
const initialWatchlist = [
  { id: 1, title: 'Inception', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 2, title: 'The Matrix', poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist);

  const handleRemoveFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>Watchlist - MovieBuddy</title>
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
        <h2 className="text-3xl font-bold text-red-600 mb-6">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-400">Your watchlist is empty.</p>
        ) : (
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
        )}
      </main>

      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MovieBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
