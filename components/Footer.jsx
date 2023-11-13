import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#ffffff] to-[#d1dced] px-4 pt-16 pb-4">
      <div className="flex flex-col">
        <div>
          <div className="flex items-center gap-1.5">
            <img src="/logo.png" alt="logo.png" width={30} />
            <span className="text-lg font-black text-blue-500">INTI KODE</span>
          </div>

          <div className="mt-4 text-sm text-gray-500 flex gap-x-3 gap-y-2 flex-wrap">
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
        <div className="mt-10">
          <p className="mb-3 font-medium text-gray-600 text-sm">
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

      <div className="mt-12 flex flex-col gap-2">
        <div className="flex gap-3 text-sm text-gray-500 mx-auto">
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
        <p className="text-center font-medium text-gray-600 text-sm">
          @ {new Date().getFullYear()}{" "}
          <Link href={"/"} className="font-bold text-blue-500">
            Inti Kode
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
