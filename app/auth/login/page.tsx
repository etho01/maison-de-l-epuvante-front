/**
 * Page: Login
 */

import LoginForm from "@/src/auth/presentation/components/organisms/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectUrl = params.redirect;
  return <LoginForm redirectUrl={redirectUrl} />;
}
