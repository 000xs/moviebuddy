import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <label className="block mb-4">
            <span className="text-gray-400">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-1 block w-full"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-400">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 block w-full"
              required
            />
          </label>
          <button type="submit" className="w-full bg-red-600 p-2 rounded-lg text-white">Login</button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account? <Link href="/auth/register" className="text-red-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
