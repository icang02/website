import Link from "next/link";
import TableItem from "./TableItem";
import FormCourse from "@/components/Dashboard/FormCourse";

export const metadata = {
  title: process.env.APP_NAME + " | Dashboard Courses",
};

export default async function DashboardLihatCourse({ params: { id } }) {
  const res = await fetch(`${process.env.APP_URL}/api/courses/id/${id}`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="relative px-3 md:px-44 pt-16 pb-20 w-full min-h-screen">
      {/* <div className={`${!showModal && "hidden"} left-0 right-0 top-0 bottom-0 bg-black/50 absolute z-50`}></div> */}

      <div className="flex item-center gap-1">
        <Link
          href={"/dashboard/courses"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Kembali
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-y-10 md:gap-12">
        <div className="col-span-12 md:col-span-6">
          <FormCourse courseId={id} />

          <div className="block md:hidden w-full mt-10 bg-gray-100 h-1"></div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <TableItem data={data} />
        </div>
      </div>

      {/* MODAL EDIT DATA */}
      {/* <div className={`${!showModal && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-2xl mx-auto max-h-full">
          <div className="relative bg-white rounded-lg shadow">

            <form className="w-full">
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
                  />
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
                  />
                </div>

                <div>
                  <JoditEditor />
                </div>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                <button className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}
