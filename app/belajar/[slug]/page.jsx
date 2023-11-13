import Detail from "@/components/Course/Detail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default async function CourseDetail() {
  const URL = process.env.NEXTAUTH_URL;

  return (
    <>
      <Navbar />
      <Detail APP_URL={URL} />
      <Footer />
    </>
  );
}
