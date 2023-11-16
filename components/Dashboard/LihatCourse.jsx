"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormCourse from "./FormCourse";
import { useParams } from "next/navigation";

export default function LihatCourse() {
  const params = useParams();
  const { id } = params;

  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.APP_URL}/api/courses/id/${id}`);
    const courses = await res.json();
    setLoading(false);
    setData(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, [reload]);

  const deleteCoursePart = async (id) => {
    try {
      setBtnLoading(true);

      const res = await fetch(`${process.env.APP_URL}/api/courses/id/${id}/delete`);
      // const courseDelete = await res.json();

      fetchCourses();
      toast("Berhasil dihapus!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="px-3 md:px-44 pt-16 pb-20">
      <ToastContainer />

      <div className="flex item-center gap-1">
        <Link
          href={"/dashboard/courses"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Kembali
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <FormCourse setReload={setReload} />

          <div className="block md:hidden w-full mt-10 bg-gray-100 h-1"></div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="relative overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="w-[10%] px-6 py-3 rounded-s-lg text-center">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Judul
                  </th>
                  <th scope="col" className="w-[15%] px-6 py-3 text-center">
                    Content
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="text-center">
                    <td className="px-6 py-4" colSpan={3}>
                      Loading data...
                    </td>
                  </tr>
                ) : data.course_part == null ? (
                  <tr className="text-center">
                    <td className="px-6 py-4" colSpan={3}>
                      Belum ada data.
                    </td>
                  </tr>
                ) : (
                  data.course_part.map((item, i) => (
                    <tr className="bg-white" key={i}>
                      <th className="px-6 py-4 text-center">{item.order}</th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap border">
                        {item.title}
                      </th>
                      <td className="px-6 py-4 flex gap-0 flex-col md:gap-1 md:flex-row items-center justify-center">
                        <button
                          className={`mb-3 inline-block px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                        >
                          Lihat
                        </button>
                        <button
                        disabled={btnLoading} 
                        onClick={() =>deleteCoursePart(item.id)}
                          className={`${btnLoading && '!opacity-80 !hover:bg-red-600'} mb-3 inline-block px-4 py-2 text-white bg-red-600 hover:bg-red-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
