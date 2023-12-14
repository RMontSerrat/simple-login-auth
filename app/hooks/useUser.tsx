'use client';

import useSWR from 'swr';
import api from '@/app/services/api';
import { useAuth } from '@/app/hooks/useAuth';

const fetcher = (url: string) => api.get(url).then(res => res.data);

const normalizeUser = (data: User) => ({
  name: `${data.firstName} ${data.lastName}`,
  companyName: data.company.name,
  companyDepartment: data.company.department,
  image: data.image,
  age: data.age,
  email: data.email,
  phone: data.phone,
  gender: data.gender,
})

export const useUser = () => {
  const { userData } = useAuth();
  const { id: userId } = userData ?? {};
  const { data, error, mutate } = useSWR<User>(userId ? `/users/${userId}` : null, fetcher);

  return {
    user: data ? normalizeUser(data) : null,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
