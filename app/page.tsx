import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-dark text-white">
            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center py-20 md:py-32 px-6 text-center overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crimson-900/20 rounded-full blur-3xl" />
                </div>

                <p className="relative text-xs md:text-sm uppercase tracking-[0.3em] text-crimson-400 font-semibold mb-4 animate-fadeIn">
                    Bienvenue dans
                </p>
                <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance animate-fadeIn">
                    La Petite Maison<br />
                    <span className="bg-linear-to-r from-crimson-500 via-crimson-600 to-crimson-500 bg-clip-text text-transparent">
                        de l&apos;Épouvante
                    </span>
                </h1>
                <p className="relative max-w-2xl text-base md:text-lg text-neutral-400 mb-10 leading-relaxed animate-fadeIn">
                    Boutique, fanzine &amp; communauté pour les passionnés de cinéma d&apos;horreur.
                    Figurines, blu-ray, numéros digitaux et espace de troc entre collectionneurs.
                </p>
                <div className="relative flex flex-col sm:flex-row gap-4 animate-fadeIn">
                    <Link
                        href="/produits"
                        className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-crimson-600 hover:bg-crimson-500 transition-all duration-300 font-semibold text-white shadow-crimson-md hover:shadow-crimson-lg hover:scale-105"
                    >
                        <span>Visiter la boutique</span>
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="/abonnements"
                        className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-crimson-700 hover:border-crimson-500 hover:bg-crimson-950/40 transition-all duration-300 font-semibold text-neutral-200 hover:text-white"
                    >
                        <span>S&apos;abonner au fanzine</span>
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Features grid */}
            <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        icon: (
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 6v8h3v8h2V2c-5 0-5 4-5 4zm-3 8V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2zm-1.5 0h-6c-.28 0-.5-.22-.5-.5v-7c0-.28.22-.5.5-.5h6c.28 0 .5.22.5.5v7c0 .28-.22.5-.5.5zM2 18v4h12v-4H2zm2 2v-1h8v1H4z"/>
                            </svg>
                        ),
                        title: 'Boutique horreur',
                        description:
                            'Figurines, jeux, blu-ray et la collection exclusive Evil Ed — introuvable ailleurs.',
                        href: '/produits',
                        cta: 'Explorer',
                    },
                    {
                        icon: (
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                            </svg>
                        ),
                        title: 'Fanzine numérique',
                        description:
                            'Accédez à tous les numéros digitalisés depuis votre espace membre. Lisez où vous voulez.',
                        href: '/abonnements',
                        cta: 'S\'abonner',
                    },
                    {
                        icon: (
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        ),
                        title: 'Espace troc',
                        description:
                            'Échangez ou donnez vos raretés entre collectionneurs. Trouvez la perle rare.',
                        href: '/compte',
                        cta: 'Rejoindre',
                    },
                ].map((card, index) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group relative flex flex-col gap-6 glass-effect rounded-2xl p-8 hover:border-crimson-700/50 transition-all duration-300 hover:shadow-crimson-md overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-linear-to-br from-crimson-900/0 via-crimson-900/0 to-crimson-900/0 group-hover:from-crimson-900/10 group-hover:to-crimson-950/20 transition-all duration-300 rounded-2xl" />
                        
                        <div className="relative">
                            <div className="inline-flex p-3 bg-crimson-950/50 text-crimson-400 rounded-xl group-hover:bg-crimson-900/50 group-hover:text-crimson-300 transition-all duration-300 group-hover:scale-110 transform">
                                {card.icon}
                            </div>
                        </div>
                        
                        <div className="relative flex-1 space-y-3">
                            <h2 className="text-xl font-bold text-neutral-100 group-hover:text-crimson-400 transition-colors">
                                {card.title}
                            </h2>
                            <p className="text-neutral-400 text-sm leading-relaxed">{card.description}</p>
                        </div>
                        
                        <div className="relative flex items-center text-crimson-500 text-sm font-semibold group-hover:text-crimson-400 transition-colors">
                            <span>{card.cta}</span>
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </section>

            {/* CTA strip */}
            <section className="relative border-t border-crimson-900/30 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-crimson-950/20 via-crimson-900/10 to-crimson-950/20" />
                <div className="relative max-w-4xl mx-auto py-16 px-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-100">Déjà membre ?</h3>
                    <p className="text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Retrouvez vos commandes, abonnements et accès à la liseuse depuis votre espace personnel.
                    </p>
                    <Link
                        href="/compte"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span>Mon compte</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}