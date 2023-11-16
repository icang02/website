import parse from "html-react-parser";
import Breadcrumb from "../Breadcrumb";

export default function Detail({ courses }) {
  // console.log(courses);

  return (
    <div className="pt-[88px] px-4 pb-0">
      <Breadcrumb title={courses.title} />
      <div className="mt-5">
        <img src={courses.image} alt="image.jpg" className="w-full aspect-video object-cover object-center rounded-xl" />

        <h6 className="font-bold leading-6 mt-5">{courses.title}</h6>
        <p className="mt-5 text-sm text-p leading-6">{courses.description}</p>
        <h6 className="mt-5 font-bold text-gray-800">Daftar materi</h6>

        <div className="mt-3 flex flex-col gap-1">
          {courses.course_part.map((item, i) => (
            <div
              key={i}
              className={`${
                item.order == 1 && "!bg-blue-500 text-white"
              } cursor-pointer w-full bg-[#F3F4F6] border border-blue-200 rounded px-4 py-2.5 text-sm text-p transition-all ease-in-out text-gray-600 hover:bg-blue-400 hover:text-white`}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-sm">
            {parse(courses.course_part[0].title)}
          </div>
        </div>
      </div>

      <div className="mt-5 w-full h-0.5 bg-gray-100"></div>
    </div>
  );
}
