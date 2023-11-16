"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.APP_URL}/api/courses`);
    const courses = await res.json();
    setLoading(false);
    setData(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      setBtnLoading(true);

      const res = await fetch(`${process.env.APP_URL}/api/courses/delete/${id}`);
      const courseDeleted = await res.json();
      console.log(courseDeleted.msg);

      fetchCourses();
      toast("Berhasil dihapus!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="px-3 md:px-44 mt-20">
      <ToastContainer />

      <div className="flex item-center gap-1">
        <Link
          href={"/dashboard/courses/create"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Add Data
        </Link>
        <Link
          href={"/dashboard"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Kembali
        </Link>
      </div>

      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Gambar
              </th>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td className="px-6 py-4" colSpan={4}>
                  Loading data...
                </td>
              </tr>
            ) : data.length == 0 ? (
              <tr className="text-center">
                <td className="px-6 py-4" colSpan={4}>
                  Belum ada data.
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr className="bg-white" key={i}>
                  <td className="px-6 py-4">
                    <img src={item.image} alt="image.jpg" className="rounded-lg w-[200px]" />
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap border">
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 flex gap-0 flex-col md:gap-1 md:flex-row items-center">
                    <Link
                      className={`mb-3 inline-block px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                      href={`/dashboard/courses/edit/${item.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCourse(item.id)}
                      className={`${
                        btnLoading && "opacity-80 !hover:bg-red-500"
                      } mb-3 inline-block px-4 py-2 text-white bg-red-500 hover:bg-red-700 text-xs transition-all duration-300 focus:ring-red-600 focus:outline-none font-medium rounded md:text-xs`}
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
  );
}
