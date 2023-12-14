import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getAuth() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken');
  return authToken;
}

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return async function WithAuthComponent(props: any) {
    const authToken = await getAuth();
    if (!authToken) {
      redirect('/login')
    }
    return <WrappedComponent {...props} />;
  };
};
