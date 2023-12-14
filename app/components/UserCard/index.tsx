'use client';

import { Box, Card, Flex, Avatar, Text, Button } from '@radix-ui/themes';

type User = {
  image: string;
  name: string;
  companyName: string;
  age: number;
  phone: string;
  gender: string;
  email: string;
};

type UserCardProps = {
  user: User;
  onLogout: () => void;
}

export function UserCard({ user, onLogout }: UserCardProps) {
  const { image, name, companyName, age, phone, gender, email } = user;
  return (
    <Card size="1" style={{ width: 350 }}>
      <Flex gap="3" align="center">
        <Avatar
          size="3"
          src={image}
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="5" weight="bold">
            {name}
          </Text>
        </Box>
      </Flex>
      <Flex mt="3" gap="1" direction="column">
        <Text as="div" size="2" color="gray">
          <strong>Gender</strong>:
          <span>{gender}</span>
        </Text>
        <Text as="div" size="2" color="gray">
          <strong>Age</strong>:
          <span>{age}</span>
        </Text>
        <Text as="div" size="2" color="gray">
          <strong>Email</strong>:
          <span>{email}</span>
        </Text>
        <Text as="div" size="2" color="gray">
          <strong>Phone</strong>:
          <span>{phone}</span>
        </Text>
        <Text as="div" size="2" color="gray">
          <strong>Company</strong>:
          <span>{companyName}</span>
        </Text>
      </Flex>
      <Flex mt="3" justify="end">
        <Button size="2" onClick={onLogout}>Logout</Button>
      </Flex>
    </Card>
  )
}