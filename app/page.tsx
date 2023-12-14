import { UserTemplate } from './templates/User';
import { withAuth } from '@/app/services/withAuth';

async function Home() {
  return (
    <UserTemplate />
  )
}

export default withAuth(Home);