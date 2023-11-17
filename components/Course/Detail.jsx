import Breadcrumb from "../Breadcrumb";
import PartDetail from "./PartDetail";

export default function Detail({ courses }) {
  // console.log(courses);

  return (
    <div className="pt-[88px] px-4 pb-0">
      <Breadcrumb title={courses.title} />
      <div className="mt-5">
        <img src={courses.image} alt="image.jpg" className="w-full aspect-video object-cover object-center rounded-xl" />

        <div className="px-0.5">
        <h6 className="font-bold leading-6 mt-5">{courses.title}</h6>
        <p className="mt-5 text-sm text-p leading-6">{courses.description}</p>
        </div>

        <h6 className="mt-5 font-bold text-gray-800">Daftar materi</h6>

        <PartDetail courses={courses} />
      </div>

      <div className="mt-5 w-full h-0.5 bg-gray-100"></div>
    </div>
  );
}
