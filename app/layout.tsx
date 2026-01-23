import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from "@/src/auth/presentation/context/AuthContext";
import { SymfonyAuthRepository } from "@/src/auth/infrastructure/repositories/SymfonyAuthRepository";
import { User } from "@/src/auth/domain/entities/User";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Petite Maison de l'Épouvante",
  description: "Boutique en ligne et communauté pour les passionnés d'horreur",
};

const authRepository = new SymfonyAuthRepository();

async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await authRepository.getCurrentUser();
    return user;
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getCurrentUser();
  
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <AuthProvider initialUser={initialUser}>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
