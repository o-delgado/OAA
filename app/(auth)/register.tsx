import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from 'react-native';

import { OaaButton } from '@/components/OaaButton';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { registerUser } from '@/services/authService';

export default function RegisterScreen() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    if (
      !displayName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await registerUser({
        displayName,
        email,
        password,
      });
    } catch {
      setError('Unable to create account.');
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
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            className="mb-9 flex-row items-center self-start py-2"
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color="#20A9FF"
            />

            <OaaText
              variant="caption"
              className="ml-2 text-oaa-primary"
            >
              BACK
            </OaaText>
          </Pressable>

          <View className="mb-9">
            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-1 w-8 bg-oaa-primary" />

              <OaaText
                variant="caption"
                className="text-oaa-primary"
              >
                OAA SYSTEM
              </OaaText>
            </View>

            <OaaText variant="title">
              Registration
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-2"
            >
              Create your student assessment profile.
            </OaaText>

            <View className="mt-6 h-px bg-oaa-border" />
          </View>

          <Field
            icon="person-outline"
            label="DISPLAY NAME"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Name"
          />

          <Field
            icon="mail-outline"
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            placeholder="student@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordField
            label="PASSWORD"
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            onToggle={() =>
              setShowPassword((value) => !value)
            }
          />

          <PasswordField
            label="CONFIRM PASSWORD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            showPassword={showConfirmPassword}
            onToggle={() =>
              setShowConfirmPassword((value) => !value)
            }
          />

          <View className="mt-1 border border-oaa-border bg-oaa-surface px-4 py-4">
            <OaaText
              variant="caption"
              className="text-oaa-primary"
            >
              PASSWORD REQUIREMENTS
            </OaaText>

            <Requirement
              valid={password.length >= 6}
              text="At least 6 characters"
            />

            <Requirement
              valid={/[A-Za-z]/.test(password)}
              text="Contains a letter"
            />

            <Requirement
              valid={/[0-9]/.test(password)}
              text="Contains a number"
            />
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
            className="mt-7"
            loading={loading}
            onPress={handleRegister}
          >
            CREATE ACCOUNT
          </OaaButton>

          <Pressable
            className="mt-7 items-center py-2"
            onPress={() => router.back()}
          >
            <OaaText variant="muted">
              Already have an account?
            </OaaText>

            <OaaText
              variant="caption"
              className="mt-2 font-bold text-oaa-primary"
            >
              SIGN IN →
            </OaaText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

interface FieldProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
}

function Field({
  icon,
  label,
  ...props
}: FieldProps) {
  return (
    <View className="mb-5">
      <OaaText variant="caption">
        {label}
      </OaaText>

      <View className="mt-2 flex-row items-center border border-oaa-border bg-oaa-surface px-4">
        <Ionicons
          name={icon}
          size={19}
          color="#20A9FF"
        />

        <TextInput
          className="h-14 flex-1 pl-3 text-base text-oaa-text"
          placeholderTextColor="#596A76"
          autoCorrect={false}
          {...props}
        />
      </View>
    </View>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
}

function PasswordField({
  label,
  value,
  onChangeText,
  showPassword,
  onToggle,
}: PasswordFieldProps) {
  return (
    <View className="mb-5">
      <OaaText variant="caption">
        {label}
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
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <Pressable
          hitSlop={12}
          onPress={onToggle}
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
  );
}

function Requirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <View className="mt-3 flex-row items-center">
      <Ionicons
        name={
          valid
            ? 'checkmark-circle-outline'
            : 'ellipse-outline'
        }
        size={16}
        color={valid ? '#46C78A' : '#596A76'}
      />

      <OaaText
        variant="muted"
        className={`ml-2 ${
          valid ? 'text-oaa-success' : ''
        }`}
      >
        {text}
      </OaaText>
    </View>
  );
}