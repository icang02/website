"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Card() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const onLogout = async () => {
    setLoading(true);

    await signOut({
      redirect: false,
    });
    router.replace("/");
    router.refresh();
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-1">
      <h1 className="font-bold bg-blue-500 rounded-lg text-white px-3 py-1 mb-2">
        <Link href={"/"}>Inti Kode</Link>
      </h1>

      <div className="bg-white w-full p-5 rounded-lg shadow-lg">
        <h6 className="font-bold text-lg mb-2">
          Welcome, <span className="text-blue-500">{session?.user?.name}</span>
        </h6>

        <div className="flex gap-3 items-center text-gray-600 mb-3 text-sm">
          <div>
            <p>
              Email : <span className="font-bold">{session?.user?.email}</span>
            </p>
            <p>
              Address :{" "}
              <span className="font-bold">{session?.user?.address}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={onLogout}
              disabled={loading}
              className={`px-4 py-2 text-white bg-blue-500 ${
                loading ? "opacity-80" : "hover:bg-blue-600"
              } text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded`}
            >
              Logout
            </button>
            <Link
              href={"/dashboard/courses"}
              className={`px-4 py-2 text-white bg-blue-500 ${
                loading ? "opacity-80" : "hover:bg-blue-600"
              } text-xs transition-all duration-300 focus:ring-2 focus:outline-none font-medium rounded`}
            >
              Courses
            </Link>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
            <div className="h-1 rounded bg-[#fde5a7] border"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
