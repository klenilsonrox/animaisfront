
"use client"
import { UserProvider } from "@/components/UserProvider";
import "./globals.css";
import Footer from "@/components/Footer";




export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <title>Adote um Pet</title>
      <body>
        <UserProvider>
        {children}
        </UserProvider>
        </body>
    </html>
  );
}
