import {
    onAuthStateChanged,
    type User,
} from 'firebase/auth';
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';

import { auth } from '@/lib/firebase';
import { getAppUser } from '@/services/authService';
import type { AppUser } from '@/types/user';

interface AuthContextValue {
  firebaseUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const [firebaseUser, setFirebaseUser] =
    useState<User | null>(null);

  const [appUser, setAppUser] =
    useState<AppUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setFirebaseUser(user);

        if (user) {
          const profile = await getAppUser(user.uid);
          setAppUser(profile);
        } else {
          setAppUser(null);
        }

        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}