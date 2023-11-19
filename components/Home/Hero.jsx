import Link from "next/link";
import { GoPlay } from "react-icons/go";

export default function Hero() {
  return (
    <div className="pt-28 md:pt-36 pb-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-12 md:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <h6 className="mb-2 text-sm md:text-base font-extrabold text-blue-500">INTI KODE</h6>
          <h1 className="uppercase text-2xl md:text-4xl leading-9 font-black text-gray-800 max-w-xs md:max-w-lg">
            implementasi <span className="text-blue-500">koding</span> secara langsung
          </h1>

          <div className="w-32 h-1 bg-blue-500 my-4 md:my-7"></div>

          <p className="text-p text-sm md:text-base leading-6 md:leading-7">
            Platform koding dengan beragam tutorial interaktif dan proyek praktis yang dirancang untuk membawa Anda melalui implementasi kode tanpa membebani dengan teori yang berlebihan.
          </p>

          <Link href={"/"} className="flex items-center gap-3 mt-6 md:mt-8 w-fit">
            <button className="flex items-center justify-center bg-blue-500 text-white font-bold w-10 h-10 md:w-12 md:h-12 rounded-full text-2xl">
              <GoPlay />
            </button>
            <div className="text-gray-800 font-bold flex flex-col gap-0.5 uppercase">
              <p className="text-sm md:text-base">Belajar Sekarang</p>
              <p className="text-blue-500 text-xs md:text-sm">Codingers</p>
            </div>
          </Link>
        </div>

        <div className="hidden md:block md:col-span-6">
          <img src="/hero.jpg" alt="hero.jpg" className="object-cover object-center" />
        </div>
      </div>
    </div>
  );
}
