'use client';

import { UserCard } from '@/app/components/UserCard'
import { useUser } from '@/app/hooks/useUser'
import { useAuth } from '@/app/hooks/useAuth';

export function UserTemplate() {
  const { user, isLoading } = useUser();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      {!isLoading && user && (
        <UserCard
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}
