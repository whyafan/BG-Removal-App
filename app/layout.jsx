import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "bg.removal",
  description: "Remove image backgrounds in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
