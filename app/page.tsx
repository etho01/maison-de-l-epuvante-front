import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-linear-to-b from-black via-red-950/20 to-black text-white">
            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-900/20 rounded-full blur-3xl" />
                </div>

                <p className="relative text-sm uppercase tracking-[0.3em] text-red-500 font-medium mb-4">
                    Bienvenue dans
                </p>
                <h1 className="relative text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    La Petite Maison<br />
                    <span className="text-red-600">de l&apos;Épouvante</span>
                </h1>
                <p className="relative max-w-xl text-lg text-gray-400 mb-10">
                    Boutique, fanzine &amp; communauté pour les passionnés de cinéma d&apos;horreur.
                    Figurines, blu-ray, numéros digitaux et espace de troc entre collectionneurs.
                </p>
                <div className="relative flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/produits"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-red-700 hover:bg-red-600 transition-colors font-semibold text-white shadow-lg shadow-red-900/50"
                    >
                        Visiter la boutique
                    </Link>
                    <Link
                        href="/abonnements"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-red-800 hover:border-red-600 hover:bg-red-950/40 transition-colors font-semibold text-gray-300"
                    >
                        S&apos;abonner au fanzine
                    </Link>
                </div>
            </section>

            {/* Features grid */}
            <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        icon: '🎬',
                        title: 'Boutique horreur',
                        description:
                            'Figurines, jeux, blu-ray et la collection exclusive Evil Ed — introuvable ailleurs.',
                        href: '/produits',
                        cta: 'Explorer',
                    },
                    {
                        icon: '📖',
                        title: 'Fanzine numérique',
                        description:
                            'Accédez à tous les numéros digitalisés depuis votre espace membre. Lisez où vous voulez.',
                        href: '/abonnements',
                        cta: 'S\'abonner',
                    },
                    {
                        icon: '🤝',
                        title: 'Espace troc',
                        description:
                            'Échangez ou donnez vos raretés entre collectionneurs. Trouvez la perle rare.',
                        href: '/compte',
                        cta: 'Rejoindre',
                    },
                ].map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group flex flex-col gap-4 bg-black border border-red-900/50 rounded-xl p-6 hover:border-red-700 hover:shadow-lg hover:shadow-red-900/30 transition-all"
                    >
                        <span className="text-4xl">{card.icon}</span>
                        <h2 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                            {card.title}
                        </h2>
                        <p className="text-gray-400 text-sm flex-1">{card.description}</p>
                        <span className="text-red-500 text-sm font-medium group-hover:underline">
                            {card.cta} →
                        </span>
                    </Link>
                ))}
            </section>

            {/* CTA strip */}
            <section className="border-t border-red-900/40 bg-red-950/10 py-16 px-6 text-center">
                <h3 className="text-2xl font-bold mb-3">Déjà membre ?</h3>
                <p className="text-gray-400 mb-6">
                    Retrouvez vos commandes, abonnements et accès à la liseuse depuis votre espace personnel.
                </p>
                <Link
                    href="/compte"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors font-semibold text-white"
                >
                    Mon compte
                </Link>
            </section>
        </main>
    );
}