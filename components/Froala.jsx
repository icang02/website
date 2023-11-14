"use client";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
// const FroalaEditorView = dynamic(
//   () => import("react-froala-wysiwyg/FroalaEditorView"),
//   {
//     ssr: false,
//   }
// );
import("froala-editor/js/plugins/image.min.js");
import("froala-editor/js/plugins/char_counter.min.js");
// import("froala-editor/js/plugins/save.min.js");

export default function Froala() {
  const [model, setModel] = useState("");

  const config = {
    placeholderText: "Tuliskan isi kontennya...",
    // saveInterval: 3000,
    // events: {
    //   "save.before": function (html) {
    //     localStorage.setItem("savedHtml", html);
    //   },
    // },
  };

  // HANDLE LOGIN FORM
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image:
        "https://blog.logrocket.com/wp-content/uploads/2022/01/next-js-vs-react-developer-experience.png",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Fields is required"),
      description: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          title: values.title,
          description: values.description,
          image: values.image,
          content: model,
        };

        const res = await axios.post(
          `${process.env.APP_URL}/api/courses/create`,
          data
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <main className="h-screen w-full flex flex-col justify-start items-center bg-gray-100 px-1 py-10">
      <div className="flex mb-3 gap-1">
        <Link
          className="font-bold bg-blue-500 rounded-lg text-white px-3 py-1 mb-2"
          href={"/"}
        >
          Inti Kode
        </Link>
        <Link
          className="font-bold bg-blue-500 rounded-lg text-white px-3 py-1 mb-2"
          href={"/dashboard"}
        >
          Kembali
        </Link>
      </div>

      <div className="px-1 md:px-96">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
              placeholder="example@gmail.com"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-xs mt-1 ">
                {formik.errors.title}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
              placeholder="example@gmail.com"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-xs mt-1 ">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Content
            </label>
            <FroalaEditor
              onModelChange={(e) => setModel(e)}
              model={model}
              config={config}
              tag="textarea"
            />
          </div>

          <button
            type="submit"
            className="font-bold bg-blue-500 rounded-lg text-white px-3 py-1 mb-2"
          >
            Create Course
          </button>
        </form>

        {/* <div className="mt-7">
          <h1 className="text-center mb-1 font-medium">Live Preview</h1>
          <div className="border-2 rounded-lg p-7 bg-white">
            <FroalaEditorView model={formik.value.content} />
          </div>
        </div> */}
      </div>
    </main>
  );
}
