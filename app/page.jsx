import Footer from "@/components/Footer";
import CardCourse from "@/components/Home/CardCourse";
import Hero from "@/components/Home/Hero";
import Text from "@/components/Home/Text";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CardCourse />
      <Text />
      <Footer />
    </>
  );
}
