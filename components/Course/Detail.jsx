"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();
  const { slug } = params;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(process.env.NODE_ENV);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.APP_URL}/api/courses/${slug}`);
      const course = await res.data;
      setData(course);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="pt-[88px] px-4 pb-0">
        {loading ? (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Loading data...
          </div>
        ) : (
          <>
            <Breadcrumb title={data.title} />
            <div className="mt-5">
              <img
                src={data.image}
                alt="image.jpg"
                className="w-full aspect-video object-cover object-center rounded-xl"
              />

              <h6 className="font-bold leading-6 mt-5">{data.title}</h6>
              <p className="mt-5 text-sm text-p leading-6">
                {data.description}
              </p>
              <h6 className="mt-5 font-bold text-gray-800">Daftar materi</h6>

              <div className="mt-3 flex flex-col gap-1">
                {/* {subMateri.map((item, i) => (
              <div
              onClick={() => handleSelectedItem(i)}
              key={i}
              className={`${selectedItem == i && "!bg-blue-500 text-white"} w-full bg-[#F3F4F6] border border-blue-200 rounded px-4 py-2.5 text-sm text-p transition-all ease-in-out text-gray-600`}
              >
                {item}
              </div>
            ))} */}
              </div>
              <div className="mt-5">
                {/* {materi.find(item => item.title === 'Pendahuluan').content} */}

                {/* {contentMateri && (
              <div className="mt-4">
                {contentMateri}
              </div>
            )} */}

                {/* NAVIGASI MATERI */}
                {/* {selectedItem != 0  && (
              <div className="mt-4 flex justify-end">
                <button 
                onClick={handlePrevMateri}
                className="text-sm inline-flex items-center gap-1 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:border-blue-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 transition-all"
                >
                  Kembali
                </button>

                {selectedItem != materi.length - 1 && (
                  <button 
                  onClick={handleNextMateri}
                  className="text-sm inline-flex items-center gap-1 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:border-blue-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 transition-all"
                  >
                    Materi selanjutnya
                  </button>
                )}
              </div>
            )} */}
              </div>
            </div>
          </>
        )}

        <div className="mt-5 w-full h-0.5 bg-gray-100"></div>
      </div>
    </>
  );
}
