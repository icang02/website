import Breadcrumb from "../Breadcrumb";
import PartDetail from "./PartDetail";

export default function Detail({ courses }) {
  const tags = ["#laravel", "#html", "#css", "#tailwind", "#react"];

  return (
    <div className="pt-[88px] px-4 pb-0 md:max-w-6xl mx-auto">
      <Breadcrumb title={courses.title} />

      <div className="grid grid-cols-12 mt-5 md:mt-7 md:gap-x-8">
        <div className="col-span-12 md:col-span-8">
          <div className="md:shadow-xl md:bg-white md:border md:rounded-t-2xl">
            <div className="md:pt-5 md:pb-0 md:px-5">
              <img src={courses.image} alt="image.jpg" className="w-full aspect-video object-cover object-center rounded-xl" />
            </div>

            <div className="md:py-5 md:px-8">
              <div className="px-0.5">
                <h6 className="font-bold leading-6 mt-5 text-base md:text-3xl">{courses.title}</h6>
                <p className="mt-5 text-p text-sm leading-6 md:text-base md:leading-7">{courses.description}</p>
              </div>

              <h6 className="mt-6 font-bold text-gray-800 md:text-lg">Daftar materi</h6>

              <PartDetail courses={courses} />
            </div>
          </div>

          <div className="mt-6 w-full h-0.5 bg-gray-100"></div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="md:shadow-lg md:bg-white md:border md:rounded-t-2xl p-3 md:p-8">
            <h6 className="text-p font-bold text-base md:text-xl">
              Pilih berdasarkan <span className="text-blue-500">#tag</span>
            </h6>
            <div className="flex flex-wrap gap-2 mt-8">
              {tags.map((item, i) => (
                <div
                  key={i}
                  className="italic cursor-pointer rounded text-xs md:text-sm bg-white px-3 py-1.5 w-fit border border-gray-500 text-gray-600 font-medium hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex mt-5">
              <button className="w-full font-medium hover:bg-blue-600 rounded transition-all bg-blue-500 px-3 py-2 text-sm text-white">Terapkan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
