import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "./providers";

export const metadata = {
  title: "Inti Kode",
  description:
    "Platform koding dengan implementasi kode secara langsung! Beragam tutorial interaktif dan proyek praktis yang dirancang untuk membawa Anda melalui implementasi kode tanpa membebani dengan teori yang berlebihan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="-mb-32">
        <NextTopLoader showSpinner={false} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
