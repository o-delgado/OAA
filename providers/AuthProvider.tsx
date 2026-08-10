import type { User } from '@supabase/supabase-js';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase';
import { getAppUser } from '@/services/authService';
import type { AppUser } from '@/types/user';

interface AuthContextValue {
  authUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
  refreshAppUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const [authUser, setAuthUser] =
    useState<User | null>(null);

  const [appUser, setAppUser] =
    useState<AppUser | null>(null);

  const [loading, setLoading] = useState(true);

  const loadAppUser = useCallback(
    async (user: User | null) => {
      if (!user) {
        setAppUser(null);
        return;
      }

      const profile = await getAppUser(user.id);
      setAppUser(profile);
    },
    [],
  );

  const refreshAppUser = useCallback(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    await loadAppUser(session?.user ?? null);
  }, [loadAppUser]);

  useEffect(() => {
    let mounted = true;

    async function initializeSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!mounted) {
          return;
        }

        const user = session?.user ?? null;

        setAuthUser(user);

        try {
          await loadAppUser(user);
        } catch (error) {
          console.error(
            'Unable to load user profile:',
            error,
          );

          if (mounted) {
            setAppUser(null);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;

        setAuthUser(user);

        void loadAppUser(user)
          .catch((error) => {
            console.error(
              'Unable to refresh user profile:',
              error,
            );

            setAppUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadAppUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        appUser,
        loading,
        refreshAppUser,
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