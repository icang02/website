import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Modal({ showModal, setShowModal, contentPart }) {
  // console.log(contentPart.title);

  console.log(contentPart.content)
  const [content, setContent] = useState("");

  // HANDLE LOGIN FORM
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: contentPart.title || "",
      order: contentPart.order || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      order: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        courses_id: id,
        title: values.title,
        order: values.order,
        content: content,
      };

      try {
        await axios.post(`${process.env.APP_URL}/api/courses/id/${id}/create`, data);
        toast("Berhasil menambahkan data!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });

        formik.resetForm();
        setContent("");
        setReload((prev) => !prev);
      } catch (error) {
        console.log("Error info : " + error);
        toast("Gagal menambahkan", { type: "error", hideProgressBar: true, transition: Slide, autoClose: 3000 });
      }
    },
  });

  return (
    <>
      <ToastContainer />
      {/* MODAL EDIT */}
      <div className={`${!showModal && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-2xl mx-auto max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}

            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Form Update</h3>
                <button
                  onClick={() => setShowModal((prev) => !prev)}
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
              {/* <!-- Modal body --> */}

              <div className="p-4 md:p-5 space-y-4">
                <div className="mb-3">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
                    Title Course Part
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                    placeholder="Write some title course part"
                    {...formik.getFieldProps("title")}
                  />
                  {formik.errors.title && formik.touched.title && <p className="text-red-500 text-xs mt-1 ">{formik.errors.title}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="order" className="block mb-2 text-sm font-medium text-gray-600">
                    Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    id="order"
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                    placeholder="Number of order part course"
                    {...formik.getFieldProps("order")}
                  />
                  {formik.errors.order && formik.touched.order && <p className="text-red-500 text-xs mt-1 ">{formik.errors.order}</p>}
                </div>

                <div>
                  <JoditEditor value={content} onChange={(e) => setContent(e)} />
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                <button className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
