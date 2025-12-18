import {
  createContext,
  useContext,
  ReactNode,
  ComponentType,
  Context,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function FirebaseProvider({
  children,
  ...props
}: {
  children: ReactNode;
} & FirebaseContextValue) {
  return (
    <FirebaseContext.Provider value={props}>{children}</FirebaseContext.Provider>
  );
}

function createRequiredContext<T>(
  context: Context<T | undefined>,
  name: string
): () => T {
  return () => {
    const contextValue = useContext(context);
    if (contextValue === undefined) {
      throw new Error(
        `use${name} must be used within a ${name}Provider`
      );
    }
    return contextValue;
  };
}

export const useFirebase = createRequiredContext(FirebaseContext, 'Firebase');

export const useFirebaseApp = (): FirebaseApp => useFirebase().app;
export const useAuth = (): Auth => useFirebase().auth;
export const useFirestore = (): Firestore => useFirebase().firestore;
