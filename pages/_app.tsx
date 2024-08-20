import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'; // Import global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return<Component {...pageProps} />
     
   
}
