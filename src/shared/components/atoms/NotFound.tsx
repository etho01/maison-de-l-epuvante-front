

interface NotFoundProps {
  message?: string;
}

export default async function NotFound({ message }: NotFoundProps) {
  return (
    <div className="text-center glass-effect border border-crimson-900/30 rounded-2xl p-12 max-w-md mx-auto">
      <svg className="w-16 h-16 mx-auto mb-4 text-crimson-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-neutral-100 text-lg font-semibold">{message || 'Élément non trouvé'}</p>
    </div>
  );
}