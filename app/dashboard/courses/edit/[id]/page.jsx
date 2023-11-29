import EditCourse from "@/components/Dashboard/EditCourse";

export const metadata = {
  title: process.env.APP_NAME + " | Edit Course",
};

export default function DashbordEditCourse({ params: { id } }) {
  return (
    <>
      <EditCourse id={id} />
    </>
  );
}
