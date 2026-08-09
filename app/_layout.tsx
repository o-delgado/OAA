import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';

function RootNavigator() {
  const { firebaseUser, loading } = useAuth();

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!firebaseUser}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={!!firebaseUser}>
        <Stack.Screen name="(tabs)" />
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