import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [npub, setNpub] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${npub}`);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-16 ${inter.className} bg-gradient-to-r from-cyan-500 to-blue-700 animate-gradient-xy`}
    >
      <img
        className='h-32 mb-6'
        src="/hug.png"
        alt="Hug emoji"
      />
      <h1 className="text-4xl font-bold">Enter your npub to onboard a friend to nostr</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          value={npub}
          onChange={(e) => setNpub(e.target.value)}
          placeholder="Enter npub"
          className="px-4 py-2 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button type="submit" className="mt-4 px-4 py-2 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700">Submit</button>
      </form>
    </main>
  );
}
