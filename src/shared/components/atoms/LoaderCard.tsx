/**
 * Component: LoaderCard
 * Composant de chargement pour les cartes - Style professionnel
 */

import React from 'react';

export const LoaderCard: React.FC = () => {
  return (
    <>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
            <div className="bg-neutral-800/50 h-48 rounded-xl mb-4"></div>
            <div className="bg-neutral-800/50 h-6 rounded-lg mb-3 w-3/4"></div>
            <div className="bg-neutral-800/50 h-4 rounded-lg mb-3 w-full"></div>
            <div className="bg-neutral-800/50 h-4 rounded-lg mb-4 w-5/6"></div>
            <div className="bg-neutral-800/50 h-10 rounded-xl w-1/2"></div>
          </div>
        ))}
    </>
  );
}