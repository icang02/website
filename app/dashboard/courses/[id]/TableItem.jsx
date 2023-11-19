"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import axios from "axios";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TableItem({ data }) {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [courses, setCourses] = useState({});
  const [content, setContent] = useState("");

  // FUNCTION DELETE COURSE PART
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

  // FUNCTION BUTTON EDIT KLIK
  const handleBtnEdit = async (partId) => {
    const res = await fetch(`${process.env.APP_URL}/api/courses/id/${partId}/edit`, { cache: "no-store" });
    const coursePart = await res.json();

    setCourses(coursePart);
    setContent(coursePart.content);
    setShowModal((prev) => !prev);
  };

  // FUNCTION HANDLE MODAL
  const handleCloseModal = () => {
    setShowModal((prev) => !prev);
  };

  // HANDLE CREATE DATA
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      partId: courses.id || "",
      title: courses.title || "",
      order: courses.order || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      order: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        partId: values.partId,
        title: values.title,
        order: values.order,
        content: content || "",
      };

      try {
        setBtnLoading(true);

        await axios.put(`${process.env.APP_URL}/api/courses/id/${data.partId}/update`, data);
        toast("Berhasil update data!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });

        setContent("");
        setShowModal(!showModal);
        formik.resetForm();
        router.refresh();
      } catch (error) {
        console.log("Error info : " + error);
        toast("Gagal update data!", { type: "error", hideProgressBar: true, transition: Slide, autoClose: 3000 });
      } finally {
        setBtnLoading(false);
      }
    },
  });

  const resetEditForm = () => {
    formik.resetForm();
    setContent(courses.content);
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
                  <button
                    onClick={() => handleBtnEdit(item.id)}
                    className={`mb-3 inline-block px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 text-xs transition-all duration-300 focus:outline-none font-medium rounded md:text-xs`}
                  >
                    Edit
                  </button>
                  <button
                    disabled={btnLoading}
                    onClick={() => {
                      handleDelete(item.id);
                    }}
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

      {/* MODAL EDIT DATA */}
      <div
        className={`${
          showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-all duration-300 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full`}
      >
        <div
          className={`${
            showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } transition-all duration-300 w-full h-screen left-0 right-0 top-0 bottom-0 bg-black/50 absolute z-40 overflow-hidden`}
        ></div>
        <div className="relative p-4 w-full max-w-2xl mx-auto max-h-full z-50">
          <div className="relative bg-white rounded-lg shadow">
            {/* <div className="w-full"> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Form Update</h3>
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="static-modal"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="p-4 md:p-5 space-y-4">
                <div className="mb-3">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
                    Title Course Part
                  </label>
                  <input
                    {...formik.getFieldProps("title")}
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                    placeholder="Write some title course part"
                  />
                  {formik.errors.title && formik.touched.title && <p className="text-red-500 text-xs mt-1 ">{formik.errors.title}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="order" className="block mb-2 text-sm font-medium text-gray-600">
                    Order
                  </label>
                  <input
                    {...formik.getFieldProps("order")}
                    type="number"
                    min={1}
                    id="order"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                    placeholder="Number of order part course"
                  />
                  {formik.errors.order && formik.touched.order && <p className="text-red-500 text-xs mt-1 ">{formik.errors.order}</p>}
                </div>

                <div>
                  <JoditEditor value={content} onChange={(e) => setContent(e)} />
                </div>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  className={`${
                    btnLoading && "!hover:bg-blue-700 !opacity-70"
                  } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  Update
                </button>
                <div
                  onClick={resetEditForm}
                  className="cursor-pointer ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Reset
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
