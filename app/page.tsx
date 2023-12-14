import { UserTemplate } from './templates/User';
import { withAuth } from '@/app/withAuth';

async function Home() {
  return (
    <UserTemplate />
  )
}

export default withAuth(Home);