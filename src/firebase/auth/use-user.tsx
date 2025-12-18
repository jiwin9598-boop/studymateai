'use client';

import { useEffect, useState } from 'react';
import type { Auth, User } from 'firebase/auth';
import { onIdTokenChanged } from 'firebase/auth';

interface UseUserProps {
  auth: Auth;
}

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  auth: Auth;
}

export function useUser({ auth }: UseUserProps): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (userState) => {
      setUser(userState);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, auth };
}
