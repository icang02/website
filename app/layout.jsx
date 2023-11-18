import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "./providers";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: process.env.APP_NAME,
  description:
    "Platform koding dengan implementasi kode secara langsung! Beragam tutorial interaktif dan proyek praktis yang dirancang untuk membawa Anda melalui implementasi kode tanpa membebani dengan teori yang berlebihan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-worksans">
        <ToastContainer />
        <NextTopLoader showSpinner={false} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
