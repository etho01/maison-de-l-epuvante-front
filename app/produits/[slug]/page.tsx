import React from 'react';
import { ProductDetailView } from '@/src/ecommerce/presentation/components/ProductDetailView';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailView slug={params.slug} />
    </div>
  );
}

          )}
        </div>
      </div>
    </div>
  );
}
