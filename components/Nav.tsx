import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:font-bold">
            About
          </Link>
        </li>
        <li>
          <Link href="/post" className="hover:font-bold">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );
}
