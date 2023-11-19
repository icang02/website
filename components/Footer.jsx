import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#ffffff] to-[#d1dced] px-4 pt-16 pb-4 md:pb-6">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        <div className="md:w-2/3">
          <div className="flex items-center gap-1.5">
            <img src="/logo.png" alt="logo.png" width={30} />
            <span className="text-lg font-black text-blue-500">CODING POINT</span>
          </div>

          <div className="mt-4 text-sm md:text-base text-gray-500 flex gap-x-3 gap-y-2 flex-wrap max-w-2xl">
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Overview
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Features
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Pricing
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Help
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Privacy
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Belajar
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Premium
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Iklan
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Privasi
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Ketentuan
            </Link>
            <Link
              className="hover:text-blue-500 hover:font-bold transition-all"
              href={"/"}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* FORM FOOTER */}
        <div className="mt-10 md:w-1/3">
          <p className="mb-3 font-medium text-gray-600 text-sm md:text-base">
            Join Our Newsletter
          </p>
          <form>
            <input
              required
              type="text"
              placeholder="Your email address"
              className="outline-none bg-transparent border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <button className="mt-1.5 w-full px-5 py-2.5 font-bold rounded bg-blue-500 text-white text-sm transition-all bg-gradient-to-br from-blue-500 to-blue-800">
              Subsribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row gap-2 max-w-6xl mx-auto">
        <div className="justify-center flex gap-3 text-sm md:text-base text-gray-700 w-full">
          <Link
            className="hover:text-blue-500 hover:font-bold transition-all"
            href={"/"}
          >
            Terms
          </Link>
          <Link
            className="hover:text-blue-500 hover:font-bold transition-all"
            href={"/"}
          >
            Privacy
          </Link>
          <Link
            className="hover:text-blue-500 hover:font-bold transition-all"
            href={"/"}
          >
            Cookies
          </Link>
        </div>

        <div className="text-center font-medium text-gray-600 text-sm w-full text-center">
          @ {new Date().getFullYear()}{" "}
          <Link href={"/"} className="font-bold text-blue-500">
            Inti Kode
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
