'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { isAdmin } from '@/src/auth/utils/roleHelpers';
import { useCart } from '@/src/ecommerce/presentation/context/CartContext';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();

    return (
        <header className="bg-gradient-to-r from-black via-red-950 to-black border-b-2 border-red-700 shadow-lg shadow-red-900/50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="text-2xl md:text-3xl font-bold text-red-600 group-hover:text-red-500 transition-colors">
                            🏚️
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-red-600 group-hover:text-red-500 transition-colors">
                                La Petite Maison
                            </span>
                            <span className="text-sm md:text-base text-red-400 tracking-widest">
                                de l'Épouvante
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/produits"
                            className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                        >
                            🛍️ Boutique
                        </Link>

                        <div className="relative group">
                            <button className="text-gray-300 hover:text-red-500 transition-colors font-medium">
                                📚 Fanzine
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-red-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="/abonnements" className="block px-4 py-2 text-gray-300 hover:bg-red-950 hover:text-red-400">
                                    S'abonner
                                </Link>
                                <Link href="/fanzine/numeros" className="block px-4 py-2 text-gray-300 hover:bg-red-950 hover:text-red-400">
                                    Numéros digitaux
                                </Link>
                                <Link href="/fanzine/collection" className="block px-4 py-2 text-gray-300 hover:bg-red-950 hover:text-red-400">
                                    Ma collection
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/evil-ed"
                            className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                        >
                            💀 Evil Ed Collection
                        </Link>

                        <Link
                            href="/troc"
                            className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                        >
                            🔄 Espace Troc
                        </Link>

                        <Link
                            href="/communaute"
                            className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                        >
                            💬 Communauté
                        </Link>

                        {/* Panier */}
                        <Link
                            href="/panier"
                            className="relative text-gray-300 hover:text-red-500 transition-colors font-medium"
                        >
                            🛒 Panier
                            {cart.totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.totalItems}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {isAdmin(user) && (
                                    <Link
                                        href="/admin"
                                        className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                                    >
                                        ⚙️ Admin
                                    </Link>
                                )}

                                <Link
                                    href="/commandes"
                                    className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                                >
                                    📦 Mes Commandes
                                </Link>

                                <Link
                                    href="/compte"
                                    className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                                >
                                    👤 {user?.firstName || 'Mon Compte'}
                                </Link>

                                <button
                                    onClick={logout}
                                    className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                                >
                                    🚪 Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-gray-300 hover:text-red-500 transition-colors font-medium"
                            >
                                🔐 Connexion
                            </Link>
                        )}

                        <Link
                            href="/panier"
                            className="relative bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
                        >
                            🛒 Panier
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-red-500 hover:text-red-400 transition-colors"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 space-y-2 border-t border-red-700 pt-4">
                        <Link
                            href="/produits"
                            className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            🛍️ Boutique
                        </Link>

                        <div className="space-y-1">
                            <div className="text-gray-300 py-2 font-medium">📚 Fanzine</div>
                            <Link
                                href="/abonnements"
                                className="block pl-6 text-gray-400 hover:text-red-500 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                S'abonner
                            </Link>
                            <Link
                                href="/fanzine/numeros"
                                className="block pl-6 text-gray-400 hover:text-red-500 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Numéros digitaux
                            </Link>
                            <Link
                                href="/fanzine/collection"
                                className="block pl-6 text-gray-400 hover:text-red-500 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Ma collection
                            </Link>
                        </div>

                        <Link
                            href="/evil-ed"
                            className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/compte"
                                        className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        👤 {user?.firstName || 'Mon Compte'}
                                    </Link>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left text-gray-300 hover:text-red-500 py-2 transition-colors"
                                    >
                                        🚪 Déconnexion
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🔐 Connexion
                                </Link>
                            )}
                        </Link>

                        <Link
                            href="/communaute"
                            className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            💬 Communauté
                        </Link>

                        <Link
                            href="/panier"
                            className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            🛒 Panier {cart.totalItems > 0 && `(${cart.totalItems})`}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {isAdmin(user) && (
                                    <Link
                                        href="/admin"
                                        className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        ⚙️ Admin
                                    </Link>
                                )}

                                <Link
                                    href="/commandes"
                                    className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    📦 Mes Commandes
                                </Link>

                                <Link
                                    href="/compte"
                                    className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    👤 {user?.firstName || 'Mon Compte'}
                                </Link>

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-gray-300 hover:text-red-500 py-2 transition-colors"
                                >
                                    🚪 Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="block text-gray-300 hover:text-red-500 py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                🔐 Connexion
                            </Link>
                        )}

                        <div className="border-t border-red-700 pt-2 mt-2">

                            <Link
                                href="/panier"
                                className="block bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors mt-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                🛒 Panier (0)
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header >
    );
}
