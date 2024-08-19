// pages/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface HomeProps {
  user: { name: string } | null;
  featuredMovie: { title: string; description: string; image: string } | null;
  recentActivities: string[] | null;
}

export default function Home({ user, featuredMovie, recentActivities }: HomeProps) {
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
        <div className="text-center mb-8">
          {user ? (
            <h2 className="text-3xl font-bold">Hello, {user.name}!</h2>
          ) : (
            <h2 className="text-3xl font-bold">Welcome to MovieBuddy!</h2>
          )}
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Featured Movie</h3>
          {featuredMovie ? (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2">{featuredMovie.title}</h4>
              <p className="mb-4">{featuredMovie.description}</p>
              <img src={featuredMovie.image} alt={featuredMovie.title} className="w-full h-64 object-cover rounded-lg" />
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading featured movie...</p>
          )}
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-2">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">{activity}</li>
              ))
            ) : (
              <li className="bg-gray-800 p-4 rounded-lg shadow-md">No recent activity</li>
            )}
          </ul>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Simulate fetching data
  const user = { name: 'John Doe' }; // Replace with real authentication logic
  const featuredMovie = {
    title: 'Inception',
    description: 'A skilled thief is given a chance at redemption if he can successfully perform inception.',
    image: 'https://image.tmdb.org/t/p/w500/xRZDWxZwxggY7B7O8x69FfMXKHV.jpg', // Example image URL
  };
  const recentActivities = [
    'Watched "The Matrix"',
    'Added "Interstellar" to watchlist',
    'Rated "Inception" 5 stars'
  ];

  return {
    props: {
      user,
      featuredMovie,
      recentActivities,
    },
  };
};
