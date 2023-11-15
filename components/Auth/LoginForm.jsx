"use client";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE LOGIN FORM
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Fields is required"),
      password: Yup.string().required("Fields is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        console.log(res)

        if (!res) {
          setError("Invalid credentials.");
          setLoading(false);
          return;
        }

        if (res.error) {
          setError("Invalid credentials.");
          setLoading(false);
          return;
        }

        router.replace("/dashboard");
        router.refresh();
      } catch (error) {
        setError("An error occurred. Please try again.");
        setLoading(false);
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
  });

  return (
    <section className="bg-gray-50 w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-600">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Auth Next
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">Sign in to your account</h1>

            {error && (
              <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 border border-red-300" role="alert">
                <div className="text-sm font-medium">{error}</div>
              </div>
            )}
            {/* ALERT SUCCESS */}
            {/* {router.query && !error && (
              <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 border border-green-300" role="alert">
                <div className="text-sm font-medium">Register successfully. Please login.</div>
              </div>
            )} */}

            <form onSubmit={formik.handleSubmit} method="post" className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  placeholder="example@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs mt-1 ">{formik.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && <p className="text-red-500 text-xs mt-1 ">{formik.errors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-gray-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                disabled={loading}
                type="submit"
                className={`w-full text-white bg-blue-500 ${loading ? "opacity-80" : "hover:bg-blue-600"} transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link href="/register" className="font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
