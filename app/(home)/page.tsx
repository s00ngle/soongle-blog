export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <img
        src="/main-img.png"
        alt="main image"
        className="max-h-80 shadow-lg border border-gray-50 hover:scale-105 transition-transform duration-300"
      />
      <h2 className="text-5xl font-semibold mt-4">Welcome</h2>
      <p className="mt-4 text-gray-700 dark:">I&apos;m soongle</p>
    </div>
  );
}
