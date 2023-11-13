import LoginForm from "@/components/Auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export const metadata = {
  title: "Inti Kode | Login",
};

export default async function Login() {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/dashboard");

  return <LoginForm />;
}
