import TableItem from "@/app/dashboard/courses/TableItem";
import Link from "next/link";

export default function TableCourses({ courses }) {
  return (
    <div className="px-3 md:px-44 pt-16 pb-20">
      <div className="flex item-center gap-1">
        <Link
          href={"/dashboard/courses/create"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Add Data
        </Link>
        <Link
          href={"/dashboard"}
          className={`mb-3 inline-block px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded md:text-sm`}
        >
          Kembali
        </Link>
      </div>

      <TableItem courses={courses} />
    </div>
  );
}
