'use client';

import { useState } from 'react';
import { Heading, Box, Card, Flex, Text, TextField, Button } from '@radix-ui/themes';

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void | Promise<void>;
  loading: boolean;
  error: string | null;
};

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} aria-live="polite">
      <Card size="1" style={{ width: 350 }}>
        <Flex direction="column" p="4">
          <Heading as="h2">Login</Heading>
          <Flex direction="column" gap="2" mt="3" mb="5">
            <Box>
              <Text as="label" htmlFor="username" color="gray" size="2">Nome de usuário</Text>
              <TextField.Input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu nome de usuário" />
            </Box>
            <Box>
              <Text as="label" htmlFor="password" color="gray" size="2">Senha</Text>
              <TextField.Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
            </Box>
          </Flex>
          {error && (
            <Box mb="2">
              <Text size="1" color="red">{error}</Text>
            </Box>
        )}
          <Button type="submit" size="3" aria-busy={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </Flex>
      </Card>
    </form>
  );
};
