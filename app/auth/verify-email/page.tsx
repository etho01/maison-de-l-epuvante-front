/**
 * Page: Verify Email
 */

import { Suspense } from 'react';
import VerifyEmail from '@/src/auth/presentation/components/VerifyEmail';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
