import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import LoadingSpinner from '../components/LoadingSpinner';

const API_KEY = '71c88b5032d53f509fe0198ff99bd84b';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface HomePageProps {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  userName: string; // Optional: Add a user name if authenticated
}

export default function Home({
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  userName,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>Home - MovieBuddy</title>
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
        {/* Welcome Message */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {userName ? `Welcome back, ${userName}!` : 'Welcome to MovieBuddy!'}
          </h2>
        </section>

        {/* Categories Section */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Categories</h2>
          <div className="flex space-x-4">
            <Link href="/category/popular" className="bg-gray-800 rounded-lg p-4 text-white hover:bg-gray-700 transition duration-300">
              Popular
            </Link>
            <Link href="/category/top-rated" className="bg-gray-800 rounded-lg p-4 text-white hover:bg-gray-700 transition duration-300">
              Top Rated
            </Link>
            <Link href="/category/upcoming" className="bg-gray-800 rounded-lg p-4 text-white hover:bg-gray-700 transition duration-300">
              Upcoming
            </Link>
          </div>
        </section>

        {/* Popular Movies Section */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Popular Movies</h2>
          {popularMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className="hover:scale-105 transition transform duration-300">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-red-600">{movie.title}</h3>
                      <p className="text-gray-300 mt-2">{movie.overview}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </section>

        {/* Top Rated Movies Section */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Top Rated Movies</h2>
          {topRatedMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topRatedMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className="hover:scale-105 transition transform duration-300">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-red-600">{movie.title}</h3>
                      <p className="text-gray-300 mt-2">{movie.overview}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </section>

        {/* Upcoming Movies Section */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Upcoming Movies</h2>
          {upcomingMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {upcomingMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className="hover:scale-105 transition transform duration-300">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-red-600">{movie.title}</h3>
                      <p className="text-gray-300 mt-2">{movie.overview}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </section>
      </main>

      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MovieBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  const popularData = await popularRes.json();

  const topRatedRes = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
  const topRatedData = await topRatedRes.json();

  const upcomingRes = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
  const upcomingData = await upcomingRes.json();

  return {
    props: {
      popularMovies: popularData.results,
      topRatedMovies: topRatedData.results,
      upcomingMovies: upcomingData.results,
      userName: "John Doe", // Example, replace with actual user data if available
    },
  };
};
