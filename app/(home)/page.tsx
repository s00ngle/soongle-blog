export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <img
        src="/main-img.png"
        alt="main image"
        className="max-h-80 shadow-lg border"
      />
      <h2 className="text-5xl font-semibold">Welcome</h2>
      <p className="mt-4 text-gray-700 dark:">I&apos;m soongle</p>
    </div>
  );
}
