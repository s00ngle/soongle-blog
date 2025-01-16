export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-gray-50">
      <img
        src="/main-img.png"
        alt="main image"
        className="h-72 w-72 rounded-full shadow-lg border border-gray-50 hover:scale-105 transition-transform duration-300 bg-blue-100"
      />
      <h2 className="text-5xl font-semibold mt-4">Welcome</h2>
      <p className="mt-4 text-gray-700 dark:">I&apos;m soongle</p>
    </div>
  );
}
