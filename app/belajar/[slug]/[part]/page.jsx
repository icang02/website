import Detail from "@/components/Course/Detail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Inti Kode | Course",
};

export default function CourseDetail() {
  return (
    <>
      <Navbar />
      <Detail />
      <Footer />
    </>
  );
}
