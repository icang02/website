"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { useParams } from "next/navigation";
import parse from "html-react-parser";

export default function Detail() {
  const params = useParams();
  const { slug } = params;

  const [courses, setCourses] = useState({});
  const [coursePart, setCoursePart] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [part, setPart] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.APP_URL}/api/courses/${slug}`);
        const courses = await res.json();
        setCourses(courses);

        console.log("api pertama dipanggil");
      } catch (error) {
        console.log("Error info : " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        setLoading2(true);

        const resp = await fetch(
          `${process.env.APP_URL}/api/courses/${courses.id}/${part}`
        );
        const coursePart = await resp.json();
        setCoursePart(coursePart);

        setLoading2(false);
      } catch (error) {
        console.log("Error info : " + error);
        setLoading2(false);
      }
    };

    if (courses.id && part) {
      fetchPartData();
      console.log("api kedua dipanggil");
    }
  }, [courses.id, part]);

  const changeCoursePart = (order) => {
    setPart(order);
  };

  return (
    <>
      <div className="pt-[88px] px-4 pb-0">
        {loading ? (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Loading data...
          </div>
        ) : (
          <>
            <Breadcrumb title={courses.title} />
            <div className="mt-5">
              <img
                src={courses.image}
                alt="image.jpg"
                className="w-full aspect-video object-cover object-center rounded-xl"
              />

              <h6 className="font-bold leading-6 mt-5">{courses.title}</h6>
              <p className="mt-5 text-sm text-p leading-6">
                {courses.description}
              </p>
              <h6 className="mt-5 font-bold text-gray-800">Daftar materi</h6>

              <div className="mt-3 flex flex-col gap-1">
                {courses.course_part.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => changeCoursePart(item.order)}
                    className={`${
                      item.order == part && "!bg-blue-500 text-white"
                    } cursor-pointer w-full bg-[#F3F4F6] border border-blue-200 rounded px-4 py-2.5 text-sm text-p transition-all ease-in-out text-gray-600 hover:bg-blue-400 hover:text-white`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <div className="text-sm">
                  {loading2 ? (
                    <div className="text-center">Loading content...</div>
                  ) : (
                    parse(coursePart.content)
                  )}
                </div>

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
