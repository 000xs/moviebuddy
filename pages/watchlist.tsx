import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  }, []);

  const handleRemoveFromWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
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
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-300">Your watchlist is empty. Start adding movies!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-red-600">{movie.title}</h3>
                </div>
                <button
                  onClick={() => handleRemoveFromWatchlist(movie.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-300"
                  aria-label="Remove from Watchlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
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
