// pages/index.tsx
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>MovieBuddy</title>
        <meta
          name="description"
          content="Your go-to app for movie recommendations!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-red-600">MovieBuddy</h1>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-red-600 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-red-600 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="hover:text-red-600 transition duration-300"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-red-600 transition duration-300"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to MovieBuddy!</h2>
          <p className="text-lg mb-6">
            Your go-to app for personalized movie recommendations.
          </p>
          <div className="flex space-x-4">
            <Link href="/auth/signup">
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-semibold mb-4">Featured Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Example movie cards */}
            <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transform transition duration-300">
              <img
                src="/placeholder.png"
                alt="Movie Poster"
                className="w-full rounded mb-2"
              />
              <h4 className="text-lg font-bold">Movie Title</h4>
              <p className="text-sm text-gray-400">Genre, Year</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transform transition duration-300">
              <img
                src="/placeholder.png"
                alt="Movie Poster"
                className="w-full rounded mb-2"
              />
              <h4 className="text-lg font-bold">Movie Title</h4>
              <p className="text-sm text-gray-400">Genre, Year</p>
            </div>
            {/* Add more movie cards as needed */}
          </div>
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
