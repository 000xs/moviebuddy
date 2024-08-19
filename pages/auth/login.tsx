// pages/auth/login.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Head>
        <title>Login - MovieBuddy</title>
      </Head>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-red-600 mb-8 text-center">Login</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-400">Username</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-800 text-white rounded" />
          </div>
          <div>
            <label className="block text-gray-400">Password</label>
            <input type="password" className="w-full px-4 py-2 bg-gray-800 text-white rounded" />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
