import Detail from "@/components/Course/Detail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: process.env.APP_NAME + " | Course",
};

export default async function Page({ params: { slug } }) {
  const res = await fetch(`${process.env.APP_URL}/api/courses/${slug}`, { cache: "no-store" });
  const courses = await res.json();

  return (
    <>
      <Navbar />
      <Detail courses={courses} />
      <Footer />
    </>
  );
}
