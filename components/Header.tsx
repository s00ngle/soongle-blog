import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-6 border-b">
      <Link href="/" className="text-2xl font-bold">
        Soongle
      </Link>
      <Nav />
    </header>
  );
}
