// pages/index.tsx
import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <Head>
        <title>Soongle Blog</title>
        <meta name="description" content="Welcome to Soongle's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">Soongle Blog</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-black hover:font-bold">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:font-bold">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow my-16 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-semibold">
          Welcome to Soongle&apos;s Blog
        </h2>
        <p className="mt-4 text-gray-700">
          I&apos;m passionate about frontend development and playing the guitar!
        </p>
      </main>

      <footer className="py-4 border-t flex justify-center items-center">
        <p className="text-sm text-gray-500">
          &copy; 2025 Soongle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
