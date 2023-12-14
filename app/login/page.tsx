import { getAuth } from '../services/withAuth'
import { redirect } from 'next/navigation'
import LoginPage from '@/app/templates/Login'

export default async function Login() {
  const authToken = await getAuth();
  if (authToken) {
    redirect('/')
  }

  return (
    <LoginPage />
  )
}