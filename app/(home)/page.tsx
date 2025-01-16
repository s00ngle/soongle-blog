import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h2 className="text-5xl font-semibold">Welcome</h2>
      <p className="mt-4 text-gray-700 dark:">I&apos;m soongle</p>
    </div>
  );
}
