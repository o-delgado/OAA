import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    TextInput,
    View,
} from 'react-native';

import { OaaButton } from '@/components/OaaButton';
import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { deleteAccount } from '@/services/accountService';

const CONFIRMATION_TEXT = 'DELETE';

export default function DeleteAccountScreen() {
  const [confirmation, setConfirmation] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const canDelete =
    confirmation.trim().toUpperCase() ===
    CONFIRMATION_TEXT;

  async function handleDeleteAccount() {
    if (!canDelete) {
      setError(
        `Type ${CONFIRMATION_TEXT} to confirm.`,
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteAccount();
    } catch (error) {
      console.error(
        'Delete account error:',
        error,
      );

      setError(
        'Unable to delete account. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="pt-6">
      <Pressable
        className="mb-8 flex-row items-center self-start py-2"
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

      <OaaText
        variant="caption"
        className="text-oaa-danger"
      >
        DANGER ZONE
      </OaaText>

      <OaaText
        variant="title"
        className="mt-2"
      >
        Delete Account
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-2"
      >
        Permanently remove your OAA account and
        associated profile information.
      </OaaText>

      <OaaCard className="mt-8 border-oaa-danger">
        <View className="flex-row">
          <Ionicons
            name="warning-outline"
            size={24}
            color="#FF5C69"
          />

          <View className="ml-3 flex-1">
            <OaaText
              variant="section"
              className="text-oaa-danger"
            >
              PERMANENT ACTION
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-3"
            >
              This action cannot be undone.
            </OaaText>
          </View>
        </View>

        <View className="mt-5 border-t border-oaa-border pt-5">
          <OaaText variant="body">
            Deleting your account will remove:
          </OaaText>

          <DeleteItem text="Your authentication account" />
          <DeleteItem text="Your OAA profile" />
          <DeleteItem text="Your profile image" />
          <DeleteItem text="Associated personal information" />
        </View>
      </OaaCard>

      <View className="mt-7">
        <OaaText variant="caption">
          TYPE DELETE TO CONFIRM
        </OaaText>

        <TextInput
          className="mt-2 h-14 border border-oaa-danger bg-oaa-surface px-4 text-base text-oaa-text"
          placeholder="DELETE"
          placeholderTextColor="#596A76"
          value={confirmation}
          onChangeText={setConfirmation}
          autoCapitalize="characters"
          autoCorrect={false}
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
        variant="danger"
        className="mt-7"
        loading={loading}
        disabled={!canDelete}
        onPress={handleDeleteAccount}
      >
        DELETE ACCOUNT
      </OaaButton>

      <OaaButton
        variant="secondary"
        className="mt-4"
        disabled={loading}
        onPress={() => router.back()}
      >
        CANCEL
      </OaaButton>
    </Screen>
  );
}

function DeleteItem({
  text,
}: {
  text: string;
}) {
  return (
    <View className="mt-3 flex-row items-center">
      <Ionicons
        name="remove-circle-outline"
        size={16}
        color="#FF5C69"
      />

      <OaaText
        variant="muted"
        className="ml-2"
      >
        {text}
      </OaaText>
    </View>
  );
}