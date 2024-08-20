// pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
// Define the type for the provider
interface Provider {
  id: string;
  name: string;
  type: string;
}

// Define the type for props
interface SignInProps {
  providers: Provider[];
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Head>
        <title>Sign In - MovieBuddy</title>
      </Head>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-red-600 mb-8 text-center">Sign In</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full mb-4 transition duration-300"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
