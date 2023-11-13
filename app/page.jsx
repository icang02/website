import Footer from "@/components/Footer";
import CardCourse from "@/components/Home/CardCourse";
import Hero from "@/components/Home/Hero";
import Text from "@/components/Home/Text";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  const APP_URL = process.env.NEXTAUTH_URL;

  return (
    <>
      <Navbar />
      <Hero />
      <CardCourse APP_URL={APP_URL} />
      <Text />
      <Footer />
    </>
  );
}
