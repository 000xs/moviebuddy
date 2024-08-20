import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const API_KEY = '71c88b5032d53f509fe0198ff99bd84b';

interface MovieDetailsProps {
  movie: any;
  cast: any[];
}

export default function MovieDetails({ movie, cast }: MovieDetailsProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>{movie.title} - MovieBuddy</title>
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
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h2 className="text-4xl font-bold text-red-600 mb-4">{movie.title}</h2>
            <p className="text-gray-400 mb-6">{movie.overview}</p>
            <p className="text-gray-300 mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
            <p className="text-gray-300 mb-2"><strong>Rating:</strong> {movie.vote_average}/10</p>
            <p className="text-gray-300 mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>

            <h3 className="text-2xl font-semibold text-red-600 mt-6">Cast</h3>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              {cast.map((actor) => (
                <li key={actor.cast_id} className="text-gray-300">
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>

            {/* Trailers section */}
            {movie.videos && movie.videos.results.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-red-600 mt-6">Trailers</h3>
                <div className="mt-4">
                  {movie.videos.results.map((video: any) => (
                    <div key={video.id} className="mb-4">
                      <h4 className="text-lg font-bold text-gray-300">{video.name}</h4>
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                      ></iframe>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;

  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`);
  const movie = await movieRes.json();

  const cast = movie.credits.cast.slice(0, 10); // Get top 10 cast members

  return {
    props: {
      movie,
      cast,
    },
  };
};
