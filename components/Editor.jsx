"use client";
import dynamic from "next/dynamic";
import axios from "axios";
import { useFormik } from "formik";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editor = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE LOGIN FORM
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      title2: "",
      order: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      description: Yup.string().required("Fields is required"),
      title2: Yup.string().required("Fields is required"),
      order: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        title: values.title,
        description: values.description,
        title2: values.title2,
        order: values.order,
        content: content,
      };

      try {
        setLoading(true);

        await axios.post(`${process.env.APP_URL}/api/courses/create`, data);
        toast("Berhasil menambahkan data!", { hideProgressBar: true, transition: Slide });

        resetForm();
        setContent("");
      } catch (error) {
        console.log("Error info : " + error);
        toast("Berhasil dihapus!", { type: "error", hideProgressBar: true, transition: Slide });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="py-14 px-3 md:px-60">
      <ToastContainer />

      <div className="flex items-center justify-center mb-3 gap-1">
        <Link href={"/"} className="bg-blue-500 rounded px-3 py-2 text-sm text-white font-bold outline-none transition-all hover:bg-blue-600">
          Inti Kode
        </Link>
        <Link href={"/dashboard/courses"} className="bg-gray-500 rounded px-3 py-2 text-sm text-white font-bold outline-none transition-all hover:bg-gray-600">
          Kembali
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Write some title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title && <p className="text-red-500 text-xs mt-1 ">{formik.errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Description in this course"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && <p className="text-red-500 text-xs mt-1 ">{formik.errors.description}</p>}
        </div>

        <div className="w-full h-1 bg-gray-100 mt-8 mb-5" />

        <p className="font-bold mb-3 text-center">Form Course Part</p>
        <div className="mb-3">
          <label htmlFor="title2" className="block mb-2 text-sm font-medium text-gray-600">
            Title Course Part
          </label>
          <input
            type="text"
            id="title2"
            className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Write some title course part"
            value={formik.values.title2}
            onChange={formik.handleChange}
          />
          {formik.errors.title2 && formik.touched.title2 && <p className="text-red-500 text-xs mt-1 ">{formik.errors.title2}</p>}
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
            value={formik.values.order}
            onChange={formik.handleChange}
          />
          {formik.errors.order && formik.touched.order && <p className="text-red-500 text-xs mt-1 ">{formik.errors.order}</p>}
        </div>

        <div>
          <JoditEditor value={content} onChange={(e) => setContent(e)} />
          {formik.errors.content && formik.touched.content && <p className="text-red-500 text-xs mt-1 ">{formik.errors.content}</p>}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="submit"
            className={`${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-600"} text-sm md:text-base mt-3 bg-blue-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
          >
            Create Course
          </button>
          <button
            onClick={formik.handleReset}
            className={`${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-gray-600"} text-sm md:text-base mt-3 bg-gray-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
