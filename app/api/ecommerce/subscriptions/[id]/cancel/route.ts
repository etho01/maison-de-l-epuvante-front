import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';

const subscriptionRepository = new SymfonySubscriptionRepository();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await subscriptionRepository.cancel(parseInt(params.id));
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de l\'annulation' },
      { status: error.status || 500 }
    );
  }
}
