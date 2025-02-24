import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 border-b bg-white">
      <Link
        href="/"
        className="text-2xl font-bold hover:scale-110 transition-transform duration-300"
      >
        Soongle
      </Link>
      <Nav />
    </header>
  );
}
