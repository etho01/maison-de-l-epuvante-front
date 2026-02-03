import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/shared/components/organisms/Header";
import { AuthProvider } from "@/src/auth/presentation/context/AuthContext";
import { SymfonyAuthRepository } from "@/src/auth/infrastructure/repositories/SymfonyAuthRepository";
import { User } from "@/src/auth/domain/entities/User";
import { CartProvider } from "@/src/ecommerce/presentation/context/CartContext";
import { EcommerceProvider } from "@/src/ecommerce/presentation/context/EcommerceContext";

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
          <EcommerceProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </EcommerceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
