'use client';

import React, { ReactNode, useMemo } from 'react';
import { initializeFirebase, FirebaseProvider, useUser } from '.';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Skeleton } from '@/components/ui/skeleton';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { app, auth, firestore } = useMemo(() => initializeFirebase(), []);
  const { user, loading: userLoading } = useUser({ auth });

  const isAuthPage = pathname === '/login';

  React.useEffect(() => {
    if (!userLoading && !user && !isAuthPage) {
      router.push('/login');
    }
    if (!userLoading && user && isAuthPage) {
      router.push('/dashboard');
    }
  }, [user, userLoading, isAuthPage, router]);

  if (userLoading || (!user && !isAuthPage) || (user && isAuthPage)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
      </div>
    );
  }

  if (!user && isAuthPage) {
    return (
      <FirebaseProvider app={app} auth={auth} firestore={firestore}>
        {children}
      </FirebaseProvider>
    );
  }

  if (user && !isAuthPage) {
    return (
      <FirebaseProvider app={app} auth={auth} firestore={firestore}>
        <AppShell>{children}</AppShell>
      </FirebaseProvider>
    );
  }

  return null;
}
