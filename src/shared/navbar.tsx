import Link from "next/link";
import { listNave } from "./const";

export function Navbar() {
  return (
    <div className="flex flex-col gap-1">
      {listNave.map((nav) => (
        <Link
          key={nav.href}
          href={nav.href}
          className="p-2 px-4 rounded-lg border-gray-300 hover:border-gray-500 bg-blue-50"
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
}
