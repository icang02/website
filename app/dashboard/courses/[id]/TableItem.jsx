"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

export default function TableItem({ data }) {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      setBtnLoading(true);

      await fetch(`${process.env.APP_URL}/api/courses/id/${id}/delete`, { cache: "no-cache" });
      toast("Berhasil hapus data!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });
      router.refresh();

      setTimeout(() => {
        setBtnLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      toast("Gagal hapus data!", { type: "error", hideProgressBar: true, transition: Slide, autoClose: 3000 });
    }
  };

  return (
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
          {data.course_part == null ? (
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
                  <button className={`mb-3 inline-block px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}>
                    Edit
                  </button>
                  <button
                    disabled={btnLoading}
                    onClick={() => handleDelete(item.id)}
                    className={`${
                      btnLoading && "!opacity-80 !hover:bg-red-600"
                    } cursor-pointer mb-3 inline-block px-4 py-2 text-white bg-red-600 hover:bg-red-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
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
  );
}
