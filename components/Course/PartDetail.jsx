"use client";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

export default function PartDetail({ courses }) {
  const [part, setPart] = useState(1);
  const [coursePart, setCoursePart] = useState({});

  // ganti warna background course list pas diklik
  const changeCoursePart = (order) => {
    setPart(order);
  };

  // next materi selanjutnya
  const handleNextMateri = () => {
    setPart(part + 1);
    window.scrollTo(0, 0);
  };

  // prev materi sebelumnya
  const handlePrevMateri = () => {
    setPart(part - 1);
    window.scrollTo(0, 0);
  };

  // use effect function
  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const res = await fetch(`${process.env.APP_URL}/api/courses/${courses.id}/${part}`);
        const coursePart = await res.json();

        setCoursePart(coursePart);
      } catch (error) {
        console.log("Error info : " + error);
      }
    };

    fetchPartData();
  }, [part]);

  return (
    <>
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

      <div className="mt-7 text-p">
        <div className="px-0.5">
          {parse(coursePart.content ?? courses.course_part[0].content)}

          <h1 className="text-2xl font-bold mb-4">Instalasi Laravel</h1>
          <h2 className="text-xl font-bold mb-4">Instalasi Laravel</h2>
          <h3 className="text-lg font-bold mb-4">Instalasi Laravel</h3>
          <h4 className="text-base font-bold mb-4">Instalasi Laravel</h4>
          <p className="mb-3 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, totam!</p>
          <p className="mb-3 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, provident possimus mollitia sed nam nobis beatae odio praesentium doloremque.</p>
          <ul className="mb-3 list-disc ml-6 text-sm">
            <li className="pl-1">Lorem, ipsum dolor.</li>
            <li className="pl-1">Lorem, ipsum.</li>
            <li className="pl-1">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</li>
          </ul>
          <img className="my-4 w-full rounded-lg" src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg" />
          <p className="mb-3 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, provident possimus mollitia sed nam nobis beatae odio praesentium doloremque.</p>
          <ol className="mb-3 list-decimal ml-6 text-sm">
            <li className="pl-1">Lorem, ipsum dolor.</li>
            <li className="pl-1">Lorem, ipsum.</li>
            <li className="pl-1">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</li>
          </ol>
        </div>

        <div className="mt-7 flex justify-end">
          {part != 1 && (
            <button
              onClick={handlePrevMateri}
              className="text-sm inline-flex items-center gap-1 text-gray-600 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 me-2 mb-2 transition-all"
            >
              Materi sebelumnya
            </button>
          )}

          {part != courses.course_part.length && (
            <button
              onClick={handleNextMateri}
              className="text-sm inline-flex items-center gap-1 text-gray-600 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 me-2 mb-2 transition-all"
            >
              Materi selanjutnya
            </button>
          )}
        </div>
      </div>
    </>
  );
}
