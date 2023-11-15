"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CardCourse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMateri() {
      try {
        const res = await fetch(`${process.env.APP_URL}/api/courses`);
        const courses = await res.json();
        setData(courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getMateri();
  }, []);

  return (
    <div className="pt-10 pb-16 px-4">
      <h1 className="mb-4 uppercase text-2xl text-center leading-7 font-black text-gray-800">
        Let&apos;s <span className="text-blue-500"> Code</span>
      </h1>
      <p className="text-p text-sm mb-7 text-center leading-6">
        Daftar materi yang telah{" "}
        <span className="font-medium text-blue-500"> dirilis</span>
      </p>

      <div className="grid grid-cols-12 gap-y-10 md:gap-12">
        {loading ? (
          <div className="col-span-12 text-sm text-center">Loading data...</div>
        ) : (
          data.map((item, i) => (
            <div className="col-span-12 md:col-span-4" key={i}>
              <Link
                href={`/belajar/${item.slug}/1`}
                className="group block w-full aspect-video overflow-hidden rounded-xl"
              >
                <div
                  className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-all ease-out duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              </Link>

              <div className="leading-6">
                <div className="border-l-2 border-r-2 rounded border-gray-50">
                  <div className="px-3">
                    <h6 className="block font-bold mt-5 text-sm text-gray-800">
                      {item.title}
                    </h6>
                    <p className="text-p mt-3 text-xs leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-1 flex items-center justify-between mt-5">
                  <div className="border border-blue-500 text-blue-500 rounded px-3 py-1 text-xs font-semibold">
                    {item.course_part.length} Bagian
                  </div>

                  <Link
                    href={`/belajar/${item.slug}/1`}
                    className="flex items-center gap-1 text-gray-800 text-sm font-semibold hover:text-blue-500"
                  >
                    <span>Mulai Belajar</span>
                    <AiOutlinePlayCircle className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="mt-5 flex justify-end">
          <a
            href={"/"}
            className="text-sm inline-flex items-center gap-1 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:border-blue-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 transition-all"
          >
            <span>Lihat Semua</span>
            <FaArrowRightLong />
          </a>
        </div>
      )}
    </div>
  );
}
