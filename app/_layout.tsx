import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import {
  AuthProvider,
  useAuth,
} from '@/providers/AuthProvider';

function RootNavigator() {
  const {
    authUser,
    appUser,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <Screen className="items-center justify-center">
        <OaaText
          variant="caption"
          className="text-oaa-primary"
        >
          OAA SYSTEM
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Loading...
        </OaaText>
      </Screen>
    );
  }

  const isAuthenticated = !!authUser;

  const isAdmin =
    isAuthenticated &&
    appUser?.role === 'admin';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="profile/settings" />
        <Stack.Screen name="profile/delete-account" />
      </Stack.Protected>

      <Stack.Protected guard={isAdmin}>
        <Stack.Screen name="admin" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthProvider>
  );
}