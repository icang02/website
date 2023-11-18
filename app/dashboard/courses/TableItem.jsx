"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableItem({ courses }) {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  // FUNCTION HAPUS COURSE
  const deleteCourse = async (id) => {
    try {
      setBtnLoading(true);

      const res = await fetch(`${process.env.APP_URL}/api/courses/delete/${id}`);
      const courseDeleted = await res.json();
      console.log(courseDeleted.msg);

      toast("Berhasil dihapus!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });
      router.refresh();
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
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
              <th scope="col" className="px-6 py-3 text-center">
                Jumlah Part
              </th>
              <th scope="col" className="px-6 py-3 text-center rounded-e-lg">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length == 0 ? (
              <tr className="text-center">
                <td className="px-6 py-4" colSpan={5}>
                  Belum ada data.
                </td>
              </tr>
            ) : (
              courses.map((item, i) => (
                <tr className="bg-white" key={i}>
                  <td className="px-6 py-4">
                    <img src={item.image} alt="image.jpg" className="rounded-lg w-[200px]" />
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap border">
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-center">{item.course_part.length}</td>
                  <td className="px-6 py-4 flex gap-0 flex-col md:gap-1 md:flex-row items-center justify-center">
                    <Link
                      className={`mb-3 inline-block px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                      href={`/dashboard/courses/edit/${item.id}`}
                    >
                      Edit
                    </Link>

                    <Link
                      className={`mb-3 inline-block px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                      href={`/dashboard/courses/${item.id}`}
                    >
                      Lihat
                    </Link>

                    <button
                      disabled={btnLoading}
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
      <ToastContainer />
    </>
  );
}
