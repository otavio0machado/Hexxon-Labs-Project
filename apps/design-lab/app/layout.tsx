import "./globals.css";
export const metadata = { title: "Hexxon Design Lab" };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
