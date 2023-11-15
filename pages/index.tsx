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
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1>Enter your npub to onboard a friend to nostr</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={npub}
          onChange={(e) => setNpub(e.target.value)}
          placeholder="Enter npub"
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
