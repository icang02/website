"use client";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";


export default function SubMenu({ button }) {
  const [click, setClick] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div>
      <div className={`${click ? "pointer-events-auto" : "pointer-events-none "} w-full h-screen overflow-x-hidden fixed z-[999]`}>
        {/* AKTIF MENU */}
        <div className={`${click ? "translate-x-0" : "translate-x-[100%]"} z-[999] w-[78%] right-0 absolute h-screen bg-gray-50 shadow transition-all duration-500 ease-in-out`}>
          <div onClick={() => setClick(!click)} className="m-3 p-0.5 w-fit text-blue-300 cursor-pointer">
            <AiOutlineClose />
          </div>

          <div className="p-3">{button}</div>
        </div>
        {/* BACKGROUND BLUR */}
        <div onClick={() => setClick(!click)} className={`${click ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"} backdrop-blur-[2px] absolute transition-all duration-700 w-full h-screen bg-black/5`}></div>
      </div>

      <div className="shadow fixed w-full backdrop-blur-lg bg-white/90 z-50">
        <nav className="mx-auto max-w-5xl flex items-center justify-between px-3.5 py-3">
          <div className="font-bold">
            <Link href={"/"}>
              <img src="/logo.png" alt="logo.jpg" className="w-8" />
            </Link>
          </div>
          <div className="relative flex justify-center items-center">
            {!input && (
              <div className="pointer-events-none gap-1.5 absolute flex">
                <span className="text-gray-400 mt-0.5">
                  <HiSearch />
                </span>
                <label className="text-gray-400 text-sm">Cari materi...</label>
              </div>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="rotate-180 text-2xl z-[0] cursor-pointer" onClick={() => setClick(!click)}>
            <HiMenuAlt1 />
          </div>

          {/* border */}
        </nav>
        <div className="h-[3.5px] w-full rounded-b-md bg-gradient-to-r from-blue-400 to-yellow-400"></div>
      </div>
    </div>
  );
}

