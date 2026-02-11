import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { GetSubscriptionPlanByIdUseCase, UpdateSubscriptionPlanUseCase, DeleteSubscriptionPlanUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlanByIdUseCase = new GetSubscriptionPlanByIdUseCase(subscriptionPlanRepository);
const updateSubscriptionPlanUseCase = new UpdateSubscriptionPlanUseCase(subscriptionPlanRepository);
const deleteSubscriptionPlanUseCase = new DeleteSubscriptionPlanUseCase(subscriptionPlanRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const plan = await getSubscriptionPlanByIdUseCase.execute(parseInt(id));
    return NextResponse.json(plan);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Plan d\'abonnement non trouvé' },
      { status: error.status || 404 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { id } = await params;
    
    const plan = await updateSubscriptionPlanUseCase.execute(parseInt(id), data);
    return NextResponse.json(plan);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la modification du plan d\'abonnement' },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await deleteSubscriptionPlanUseCase.execute(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la suppression du plan d\'abonnement' },
      { status: error.status || 500 }
    );
  }
}
