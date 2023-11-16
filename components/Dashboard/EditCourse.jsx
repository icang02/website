"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";

const EditCourse = () => {
  const params = useParams();
  const { id } = params;

  const router = useRouter();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect( () => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.APP_URL}/api/courses/edit/${id}`);
      const course = res.data;

      setData(course);
      // console.log(course);
    };

    fetchData();
  }, []);

  // HANDLE LOGIN FORM
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data.title || "",
      description: data.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      description: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        title: values.title,
        description: values.description,
        image: "https://miro.medium.com/v2/resize:fit:1400/1*ctLbF51lTz7hvCUgBW4ZvQ.png",
      };

      try {
        setLoading(true);

        const res = await axios.put(`${process.env.APP_URL}/api/courses/update/${id}`, data);
        // console.log(res.data);
        
        router.push(`/dashboard/courses`)
        // toast("Berhasil update data!", { hideProgressBar: true, transition: Slide, autoClose: 2000 });
        
      } catch (error) {
        console.log("Error info : " + error);
        toast("Gagal update data", { type: "error", hideProgressBar: true, transition: Slide, autoClose: 3000 });
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

        <div className="flex items-center gap-1">
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-600"} text-sm md:text-base mt-3 bg-blue-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
          >
            Update Course
          </button>
          <button
            disabled={loading}
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

export default EditCourse;
