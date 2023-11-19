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

      
    </div>
  );
}
