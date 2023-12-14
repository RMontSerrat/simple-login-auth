import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type WithAuthProps = {
  authToken?: string;
};

async function getAuth() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken');
  return authToken;
}

export const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  return async function WithAuthComponent(props: P) {
    const authToken = await getAuth();
    if (!authToken) {
      redirect('/login')
    }
    return <WrappedComponent {...props} authToken={props.authToken} />;
  };
};
