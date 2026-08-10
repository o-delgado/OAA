import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { OaaButton } from '@/components/OaaButton';
import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/providers/AuthProvider';

export default function AccountSettingsScreen() {
  const { appUser, authUser } = useAuth();

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
        className="text-oaa-primary"
      >
        OAA SYSTEM
      </OaaText>

      <OaaText
        variant="title"
        className="mt-2"
      >
        Account Settings
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-2"
      >
        Manage account information and security.
      </OaaText>

      <OaaCard className="mt-8">
        <OaaText variant="section">
          ACCOUNT
        </OaaText>

        <SettingsRow
          label="EMAIL"
          value={authUser?.email ?? 'Unknown'}
        />

        <SettingsRow
          label="ROLE"
          value={(appUser?.role ?? 'unknown').toUpperCase()}
        />

        <SettingsRow
          label="USER ID"
          value={authUser?.id ?? '--'}
          last
        />
      </OaaCard>

      <OaaCard className="mt-4">
        <OaaText variant="section">
          PROFILE
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Manage the personal information used throughout OAA.
        </OaaText>

        <OaaButton
          variant="secondary"
          className="mt-5"
          onPress={() => router.push('/profile/edit')}
        >
          EDIT PROFILE
        </OaaButton>
      </OaaCard>

      <OaaCard className="mt-4 border-oaa-danger">
        <OaaText
          variant="section"
          className="text-oaa-danger"
        >
          DANGER ZONE
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Permanently delete your OAA account and associated profile data.
        </OaaText>

        <OaaButton
          variant="danger"
          className="mt-5"
          onPress={() =>
            router.push('/profile/delete-account')
          }
        >
          DELETE ACCOUNT
        </OaaButton>
      </OaaCard>
    </Screen>
  );
}

function SettingsRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${
        last
          ? ''
          : 'border-b border-oaa-border'
      }`}
    >
      <OaaText variant="caption">
        {label}
      </OaaText>

      <OaaText
        variant="caption"
        className="ml-6 flex-1 text-right text-oaa-text"
        numberOfLines={1}
      >
        {value}
      </OaaText>
    </View>
  );
}