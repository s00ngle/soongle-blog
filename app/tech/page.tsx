import PageContainer from "@/components/PageContainer";
import Image from "next/image";

export default function Home() {
  return (
    <PageContainer>
      <Image
        src="/main-img.png"
        alt="main image"
        width={200}
        height={200}
        className="h-72 w-72 rounded-full shadow-lg border border-gray-50 hover:scale-105 transition-transform duration-300 bg-blue-100"
      />
      <h2 className="text-5xl font-semibold mt-4">Welcome</h2>
      <p className="mt-4 text-xl text-gray-500 dark:">I'm Soongle</p>
      <p className="mt-4 text-gray-500 dark:">Tech &Music</p>
    </PageContainer>
  );
}
