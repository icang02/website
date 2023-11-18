"use client";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as Yup from "yup";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { Slide, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormCourse({ courseId }) {
  const router = useRouter();

  const [content, setContent] = useState("");

  // HANDLE CREATE DATA
  const formik = useFormik({
    initialValues: {
      title: "",
      order: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      order: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        courses_id: courseId,
        title: values.title,
        order: values.order,
        content: content,
      };

      try {
        await axios.post(`${process.env.APP_URL}/api/courses/id/${courseId}/create`, data);
        toast("Berhasil menambahkan data!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });

        setContent("");
        formik.resetForm();
        router.refresh();
      } catch (error) {
        console.log("Error info : " + error);
        toast("Gagal menambahkan", { type: "error", hideProgressBar: true, transition: Slide, autoClose: 3000 });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <p className="font-bold mb-3 text-center">Form Course Part</p>
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

      <div className="flex items-center gap-1">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`${
            formik.isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-600"
          } text-sm md:text-base mt-3 bg-blue-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
        >
          Add Part
        </button>
        <button
          disabled={formik.isSubmitting}
          onClick={formik.handleReset}
          className={`${
            formik.isSubmitting ? "opacity-80 !cursor-not-allowed" : "hover:bg-gray-600"
          } cursor-pointer text-sm md:text-base mt-3 bg-gray-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
