import Cookies from 'cookies';

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const authToken = cookies.get('auth_token');

  if (!authToken) {
    return {
      redirect: {
        destination: '/login', // Substitua pela sua rota de login
        permanent: false,
      },
    };
  }

  return { props: {} };
};
