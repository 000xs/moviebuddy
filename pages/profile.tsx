// pages/profile.tsx
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const genres = [
  'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
];

export default function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., save user details and genres)
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
          </form>
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
