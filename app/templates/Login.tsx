'use client';

import { Flex } from '@radix-ui/themes'
import { LoginForm } from '@/app/components/LoginForm'
import { useAuth } from '@/app/providers/AuthProvider';

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleSubmit = async (username: string, password: string) => {
    login(username, password);
  };

  return (
    <Flex>
      <LoginForm error={error} onSubmit={handleSubmit} loading={loading} />
    </Flex>
  )
}
