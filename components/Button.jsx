import Link from "next/link";

export default function Button({ title, link }) {
  return (
    <Link href={link} className="bg-blue-500 rounded text-white font-bold text-xs px-4 py-1.5 cursor-pointer">
      {title}
    </Link>
  );
}
