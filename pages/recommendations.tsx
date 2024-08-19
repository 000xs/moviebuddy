import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

interface Movie {
  id: string;
  title: string;
  genre: string[];
  description: string;
  imageUrl: string;
}

interface RecommendationsProps {
  movies: Movie[];
}

const RecommendationsPage: React.FC<RecommendationsProps> = ({ movies }) => {
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'genre'>('title');

  const filteredMovies = movies.filter(movie =>
    movie.genre.some(g => g.toLowerCase().includes(filter.toLowerCase()))
  );

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return a.genre[0].localeCompare(b.genre[0]);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Movie Recommendations</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Filter by genre..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'genre')}
          className="border p-2 rounded-md"
        >
          <option value="title">Sort by Title</option>
          <option value="genre">Sort by Genre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedMovies.map(movie => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="relative h-48 mb-4">
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-400 mb-2">{movie.genre.join(', ')}</p>
            <p className="text-gray-300">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch movies data from an API or database
  const response = await fetch('https://api.example.com/movies');
  const movies = await response.json();

  return {
    props: {
      movies,
    },
  };
};

export default RecommendationsPage;
