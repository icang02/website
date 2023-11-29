import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import slugify from "slugify";

const EditCourse = ({ id }) => {

  const updateData = async (formData) => {
    "use server"
    const title = formData.get('title');
    const description = formData.get('description');

    const course = await prisma.courses.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        slug: slugify(title, { lower: true }),
        description: description,
      },
    });
    await prisma.$disconnect();

    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
  }


  return (
    <div className="py-14 px-3 md:px-60">

      <div className="flex items-center justify-center mb-3 gap-1">
        <Link href={"/"} className="bg-blue-500 rounded px-3 py-2 text-sm text-white font-bold outline-none transition-all hover:bg-blue-600">
          Inti Kode
        </Link>
        <Link href={"/dashboard/courses"} className="bg-gray-500 rounded px-3 py-2 text-sm text-white font-bold outline-none transition-all hover:bg-gray-600">
          Kembali
        </Link>
      </div>

      <form action={updateData}>
        <div className="mb-3">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={'title'}
            className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Write some title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={'descriptin ajae'}
            className="bg-gray-50 border border-gray-300 outline-none text-gray-600 sm:text-sm focus:border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Description in this course"
            rows={3}
          />
        </div>

        <div className="w-full h-1 bg-gray-100 mt-8 mb-5" />

        <div className="flex items-center gap-1">
          <button
            type="submit"
            className={`text-sm md:text-base mt-3 bg-blue-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
          >
            Update Course
          </button>
          <button
            className={`text-sm md:text-base mt-3 bg-gray-500 rounded px-3 py-2 text-white font-bold outline-none transition-all `}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
