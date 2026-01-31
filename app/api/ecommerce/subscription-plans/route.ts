import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();

export async function GET(request: NextRequest) {
  try {
    const plans = await subscriptionPlanRepository.getAll();
    return NextResponse.json({ 'hydra:member': plans });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des plans' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const plan = await subscriptionPlanRepository.create(data);
    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création du plan' },
      { status: error.status || 500 }
    );
  }
}
