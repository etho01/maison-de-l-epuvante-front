'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { isAdmin } from '@/src/auth/utils/roleHelpers';
import { useCart } from '@/src/ecommerce/presentation/context/CartContext';
import { Button } from '@/src/shared/components/atoms';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-crimson-900/30">
            <nav className="container mx-auto px-4 lg:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-crimson rounded-lg flex items-center justify-center shadow-crimson-md group-hover:shadow-crimson-glow transition-all duration-300">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-crimson-100" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.45-3.08 8.63-7 9.67-3.92-1.04-7-5.22-7-9.67V7.78l6-2.7V2.18z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-bold text-neutral-100 group-hover:text-crimson-400 transition-colors">
                                La Petite Maison
                            </span>
                            <span className="text-xs md:text-sm text-crimson-500 tracking-wider font-medium">
                                de l'Épouvante
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link
                            href="/produits"
                            className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                        >
                            Boutique
                        </Link>

                        <div className="relative group">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-4 py-2 text-sm font-medium"
                            >
                                Fanzine
                            </Button>
                            <div className="absolute top-full left-0 mt-2 w-56 glass-effect rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                                <Link href="/abonnements" className="block px-4 py-3 text-sm text-neutral-300 hover:bg-crimson-950/50 hover:text-crimson-400 transition-colors">
                                    S'abonner
                                </Link>
                                <Link href="/fanzine/numeros" className="block px-4 py-3 text-sm text-neutral-300 hover:bg-crimson-950/50 hover:text-crimson-400 transition-colors">
                                    Numéros digitaux
                                </Link>
                                <Link href="/fanzine/collection" className="block px-4 py-3 text-sm text-neutral-300 hover:bg-crimson-950/50 hover:text-crimson-400 transition-colors">
                                    Ma collection
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/evil-ed"
                            className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                        >
                            Evil Ed Collection
                        </Link>

                        <Link
                            href="/troc"
                            className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                        >
                            Espace Troc
                        </Link>

                        <Link
                            href="/communaute"
                            className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                        >
                            Communauté
                        </Link>

                        <div className="h-6 w-px bg-neutral-700 mx-2"></div>

                        {isAuthenticated ? (
                            <>
                                {isAdmin(user) && (
                                    <Link
                                        href="/admin"
                                        className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                                    >
                                        Admin
                                    </Link>
                                )}

                                <Link
                                    href="/commandes"
                                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                                >
                                    Mes Commandes
                                </Link>

                                <Link
                                    href="/compte"
                                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                                >
                                    {user?.firstName || 'Mon Compte'}
                                </Link>

                                <Button
                                    onClick={logout}
                                    variant="ghost"
                                    size="sm"
                                    className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-crimson-500"
                                >
                                    Déconnexion
                                </Button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                            >
                                Connexion
                            </Link>
                        )}

                        <Link
                            href="/panier"
                            className="relative ml-2 bg-crimson-600 hover:bg-crimson-500 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-crimson-sm hover:shadow-crimson-md"
                        >
                            Panier
                            {cart.totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-crimson-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-neutral-950">
                                    {cart.totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        variant="ghost"
                        size="sm"
                        className="lg:hidden p-2"
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
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
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 space-y-1 border-t border-crimson-900/30 pt-4 animate-fadeIn">
                        <Link
                            href="/produits"
                            className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Boutique
                        </Link>

                        <div className="space-y-1">
                            <div className="px-4 py-3 text-sm font-medium text-neutral-400">Fanzine</div>
                            <Link
                                href="/abonnements"
                                className="block pl-8 pr-4 py-2 text-sm text-neutral-400 hover:text-crimson-400 hover:bg-neutral-800/30 rounded-lg transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                S'abonner
                            </Link>
                            <Link
                                href="/fanzine/numeros"
                                className="block pl-8 pr-4 py-2 text-sm text-neutral-400 hover:text-crimson-400 hover:bg-neutral-800/30 rounded-lg transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Numéros digitaux
                            </Link>
                            <Link
                                href="/fanzine/collection"
                                className="block pl-8 pr-4 py-2 text-sm text-neutral-400 hover:text-crimson-400 hover:bg-neutral-800/30 rounded-lg transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Ma collection
                            </Link>
                        </div>

                        <Link
                            href="/evil-ed"
                            className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Evil Ed Collection
                        </Link>

                        <Link
                            href="/troc"
                            className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Espace Troc
                        </Link>

                        <Link
                            href="/communaute"
                            className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Communauté
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {isAdmin(user) && (
                                    <Link
                                        href="/admin"
                                        className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                )}

                                <Link
                                    href="/commandes"
                                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Mes Commandes
                                </Link>

                                <Link
                                    href="/compte"
                                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {user?.firstName || 'Mon Compte'}
                                </Link>

                                <Button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    variant="ghost"
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-400 hover:text-crimson-500 hover:bg-neutral-800/50 rounded-lg"
                                >
                                    Déconnexion
                                </Button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-crimson-400 hover:bg-neutral-800/50 rounded-lg transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Connexion
                            </Link>
                        )}

                        <div className="border-t border-crimson-900/30 pt-3 mt-3">
                            <Link
                                href="/panier"
                                className="flex items-center justify-between bg-crimson-600 hover:bg-crimson-500 text-white px-5 py-3 rounded-lg transition-all font-medium text-sm shadow-crimson-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>Panier</span>
                                {cart.totalItems > 0 && (
                                    <span className="bg-crimson-400 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                        {cart.totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
