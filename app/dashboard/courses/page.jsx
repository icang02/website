import TableCourses from "@/components/Dashboard/TableCourses";

export const metadata = {
  title: `${process.env.APP_NAME} | Dashboard Courses`,
};

export default function DashboardCourses() {
  return <TableCourses />;
}
