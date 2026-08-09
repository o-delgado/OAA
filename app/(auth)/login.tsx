import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
    View,
} from 'react-native';

import { OaaButton } from '@/components/OaaButton';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { loginUser } from '@/services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await loginUser({
        email,
        password,
      });
    } catch {
      setError('Unable to sign in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-center">
          <View className="mb-12">
            <View className="mb-5 flex-row items-center">
              <View className="mr-3 h-1 w-8 bg-oaa-primary" />

              <OaaText
                variant="caption"
                className="text-oaa-primary"
              >
                ADVANCED NURTURING SYSTEM
              </OaaText>
            </View>

            <OaaText
              variant="display"
              className="text-[64px] font-semibold"
            >
              OAA
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-1 text-base"
            >
              Overall Ability Assessment
            </OaaText>

            <View className="mt-7 h-px bg-oaa-primary" />
          </View>

          <View>
            <OaaText
              variant="section"
              className="text-oaa-text"
            >
              SYSTEM ACCESS
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-2"
            >
              Authenticate to continue to your assessment profile.
            </OaaText>

            <View className="mt-8">
              <OaaText variant="caption">
                EMAIL
              </OaaText>

              <View className="mt-2 flex-row items-center border border-oaa-border bg-oaa-surface px-4">
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color="#20A9FF"
                />

                <TextInput
                  className="h-14 flex-1 pl-3 text-base text-oaa-text"
                  placeholder="student@example.com"
                  placeholderTextColor="#596A76"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View className="mt-5">
              <OaaText variant="caption">
                PASSWORD
              </OaaText>

              <View className="mt-2 flex-row items-center border border-oaa-border bg-oaa-surface px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={19}
                  color="#20A9FF"
                />

                <TextInput
                  className="h-14 flex-1 px-3 text-base text-oaa-text"
                  placeholder="••••••••"
                  placeholderTextColor="#596A76"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />

                <Pressable
                  hitSlop={12}
                  onPress={() => setShowPassword((value) => !value)}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={20}
                    color="#8EA0AE"
                  />
                </Pressable>
              </View>
            </View>

            {error && (
              <View className="mt-5 border-l-2 border-oaa-danger bg-oaa-surface px-4 py-3">
                <OaaText
                  variant="caption"
                  className="text-oaa-danger"
                >
                  {error}
                </OaaText>
              </View>
            )}

            <OaaButton
              className="mt-8"
              loading={loading}
              onPress={handleLogin}
            >
              ACCESS SYSTEM
            </OaaButton>

            <View className="mt-8 flex-row items-center">
              <View className="h-px flex-1 bg-oaa-border" />

              <OaaText
                variant="caption"
                className="mx-4 text-oaa-muted"
              >
                NEW USER
              </OaaText>

              <View className="h-px flex-1 bg-oaa-border" />
            </View>

            <Pressable
              className="mt-7 items-center py-2"
              onPress={() => router.push('/register')}
            >
              <OaaText
                variant="caption"
                className="font-bold text-oaa-primary"
              >
                CREATE NEW ACCOUNT →
              </OaaText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}