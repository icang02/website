import Detail from "@/components/Course/Detail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import prisma from "@/lib/prisma";

export const metadata = {
  title: process.env.APP_NAME + " | Course",
};

export default async function Page({ params: { slug } }) {
  const courses = await prisma.courses.findFirst({
    where: {
      slug: slug,
    },
    include: {
      course_part: {
        orderBy: {
          order: "asc",
        },
        select: {
          order: true,
          title: true,
          content: true
        },
      },
    },
  });
  await prisma.$disconnect()

  return (
    <>
      <Navbar />
      <Detail courses={courses} />
      <Footer />
    </>
  );
}
