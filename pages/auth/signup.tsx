// pages/auth/signup.tsx
import Link from 'next/link';
import Head from 'next/head';

export default function Signup() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Head>
        <title>Sign Up - MovieBuddy</title>
      </Head>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-red-600 mb-8 text-center">Sign Up</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-400">Username</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-800 text-white rounded" />
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <input type="email" className="w-full px-4 py-2 bg-gray-800 text-white rounded" />
          </div>
          <div>
            <label className="block text-gray-400">Password</label>
            <input type="password" className="w-full px-4 py-2 bg-gray-800 text-white rounded" />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <Link href="/auth/login">
            <a className="text-red-600 hover:underline">Log in</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
