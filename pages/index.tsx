import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

const clients = [
  ["https://damus.io", "Damus", "https://github.com/damus-io/damus/blob/9e4f0122f5264fdab7b786adcbd37a232f84ea57/damus/Assets.xcassets/AppIcon.appiconset/damus2-83.5@2x.png?raw=true"],
  ["https://primal.net", "Primal", "https://github.com/PrimalHQ/primal-web-app/blob/main/public/public/primal-logo-large.png?raw=true"],
  ["https://snort.social/", "Snort", "https://snort.social/nostrich_512.png"],
  ["https://play.google.com/store/apps/details?id=com.vitorpamplona.amethyst&pcampaignid=web_share", "Amethyst", "https://raw.githubusercontent.com/vitorpamplona/amethyst/a85ea70e4faf97818d69847f060618503e0a36b5/docs/design/VerificationIcons/Logo-Main-Amethyst.svg"],
]

export default function Home() {
  const [npub, setNpub] = useState("");
  const [refClient, setRefClient] = useState("")
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${npub}/${btoa(refClient || clients[0][0])}`);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 lg:p-16 ${inter.className} bg-gradient-to-r from-cyan-500 to-blue-700 animate-gradient-xy`}
    >
      <img
        className='h-32 mb-6'
        src="/hug.png"
        alt="Hug emoji"
      />
      <h1 className="text-3xl lg:text-4xl font-bold text-center">Enter your npub and share the link to onboard a friend to nostr</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center">
        <input
          type="text"
          value={npub}
          onChange={(e) => setNpub(e.target.value)}
          placeholder="Enter npub"
          className="px-4 py-2 w-80 lg:w-96 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex mt-8 justify-center">
          {clients.map((client, index) => (
            <img
              key={index}
              src={client[2]}
              alt={client[1]}
              onClick={() => setRefClient(client[0])}
              className="icon h-12 m-4 rounded-lg"
            />
          ))}
        </div>
        <input
          type="text"
          value={refClient}
          onChange={(e) => setRefClient(e.target.value)}
          placeholder="Recommend client (optional)"
          className="px-4 py-2 mb-8 w-64 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button type="submit" className="mt-4 px-4 py-2 rounded-lg shadow-lg bg-purple-600 text-white hover:bg-blue-700">Submit</button>
      </form>
    </main>
  );
}
