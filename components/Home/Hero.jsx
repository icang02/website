import Link from "next/link";
import { GoPlay } from "react-icons/go";

export default function Hero() {
  return (
    <div className="pt-28 pb-10 px-4">
      <h6 className="mb-2 text-sm font-extrabold text-blue-500">INTI KODE</h6>
      <h1 className="uppercase text-2xl leading-9 font-black text-gray-800 max-w-xs">implementasi <span className="text-blue-500">koding</span> secara langsung</h1>

      <div className="w-32 h-1 bg-blue-500 my-4"></div>

      <p className="text-p text-sm leading-6">Platform koding dengan beragam tutorial interaktif dan proyek praktis yang dirancang untuk membawa Anda melalui implementasi kode tanpa membebani dengan teori yang berlebihan.</p>
      
      <Link href={'/'} className="flex items-center gap-3 mt-6 w-fit">
        <button className="flex items-center justify-center bg-blue-500 text-white font-bold w-10 h-10 rounded-full text-2xl">
          <GoPlay />
        </button>
        <div className="text-gray-800 font-bold flex flex-col gap-0.5 uppercase">
          <p className="text-sm">Belajar Sekarang</p>
          <p className="text-blue-500 text-xs">Codingers</p>
        </div>
      </Link>
    </div>
  );
}
