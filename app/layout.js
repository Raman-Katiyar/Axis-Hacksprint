import "./globals.css";

export const metadata = {
  title: "Welcome to Axis HackSprint 2.o | Enter the Dark Wonderland",
  description:
    "A national-level software hackathon by Axis Institute of Technology & Management. Iterate, accelerate, elevate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
