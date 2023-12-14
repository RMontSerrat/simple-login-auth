'use client';

import { useState } from 'react';
import { Box, Card, Flex, Text, TextField, Button } from '@radix-ui/themes';
import { useAuth } from '@/app/hooks/useAuth';

export function LoginForm() {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card size="1" style={{ width: 350 }}>
        <Flex direction="column" p="4">
          <Text size="6"><strong>Login</strong></Text>
          <Flex direction="column" gap="2" mt="3" mb="5">
            <Box>
              <Text color="gray" size="2">Nome de usuário</Text>
              <TextField.Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu nome de usuário" />
            </Box>
            <Box>
              <Text color="gray" size="2">Senha</Text>
              <TextField.Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
            </Box>
          </Flex>
          <Button type="submit" size="3">
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </Flex>
      </Card>
    </form>
  );
};