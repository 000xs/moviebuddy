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

      {/* Banner Section */}
      <header className="relative bg-black">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-[70vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center p-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-48 md:w-64 rounded-lg shadow-lg md:mr-8 mb-4 md:mb-0"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">{movie.title}</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-4">{movie.overview}</p>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-red-600 px-4 py-1 rounded-full text-white font-semibold text-sm">
                  {movie.vote_average}/10
                </span>
                <span className="bg-gray-800 px-4 py-1 rounded-full text-gray-300 font-semibold text-sm">
                  {movie.runtime} min
                </span>
                <span className="bg-gray-800 px-4 py-1 rounded-full text-gray-300 font-semibold text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4"
                aria-label={`Watch ${movie.title}`}
              >
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Movie Details Section */}
      <main className="container mx-auto p-6">
        <section className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Cast</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cast.map((actor) => (
              <li key={actor.cast_id} className="flex flex-col items-center text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full mb-2"
                />
                <span className="text-gray-300 font-semibold">{actor.name}</span>
                <span className="text-gray-500 text-sm">{actor.character}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Trailers Section */}
        {movie.videos && movie.videos.results.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Trailers</h2>
            <div className="space-y-4">
              {movie.videos.results.map((video: any) => (
                <div key={video.id} className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-300">{video.name}</h3>
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
          </section>
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
