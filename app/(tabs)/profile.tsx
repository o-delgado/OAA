import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { OaaButton } from '@/components/OaaButton';
import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/providers/AuthProvider';
import { logoutUser } from '@/services/authService';
import { getProfileImageUrl } from '@/services/profileImageService';

export default function ProfileScreen() {
  const { appUser, authUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] =
    useState(false);

  const [profileImageUrl, setProfileImageUrl] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfileImage() {
      const photoPath =
        appUser?.profile.photoURL;

      if (!photoPath) {
        setProfileImageUrl(null);
        return;
      }

      try {
        setPhotoLoading(true);

        const signedUrl =
          await getProfileImageUrl(photoPath);

        if (mounted) {
          setProfileImageUrl(signedUrl);
        }
      } catch (error) {
        console.error(
          'Unable to load profile image:',
          error,
        );

        if (mounted) {
          setProfileImageUrl(null);
        }
      } finally {
        if (mounted) {
          setPhotoLoading(false);
        }
      }
    }

    void loadProfileImage();

    return () => {
      mounted = false;
    };
  }, [appUser?.profile.photoURL]);

  async function handleLogout() {
    try {
      setLoading(true);
      setError(null);

      await logoutUser();
    } catch {
      setError('Unable to sign out.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="pt-6">
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
        Profile
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Account and personal information
      </OaaText>

      <OaaCard className="mt-7">
        <View className="flex-row items-center">
          <View className="mr-4 h-14 w-14 overflow-hidden border border-oaa-primary bg-oaa-background">
            {profileImageUrl ? (
              <Image
                source={{
                  uri: profileImageUrl,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons
                  name={
                    photoLoading
                      ? 'hourglass-outline'
                      : 'person-outline'
                  }
                  size={26}
                  color="#20A9FF"
                />
              </View>
            )}
          </View>

          <View className="flex-1">
            <OaaText variant="section">
              USER PROFILE
            </OaaText>

            <OaaText className="mt-2 text-base">
              {appUser?.profile.displayName ??
                'Unknown User'}
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-1"
            >
              {authUser?.email ?? 'No email'}
            </OaaText>
          </View>
        </View>
      </OaaCard>

      <OaaCard className="mt-4">
        <OaaText variant="section">
          ACCOUNT STATUS
        </OaaText>

        <InfoRow
          label="ROLE"
          value={(
            appUser?.role ?? 'unknown'
          ).toUpperCase()}
        />

        <InfoRow
          label="USER ID"
          value={authUser?.id ?? '--'}
          last
        />
      </OaaCard>

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

      {appUser?.role === 'admin' && (
        <OaaButton
          className="mt-7"
          onPress={() => router.push('/admin')}
        >
          ADMIN PANEL
        </OaaButton>
      )}

      <OaaButton
        variant="secondary"
        className="mt-7"
        onPress={() =>
          router.push('/profile/edit')
        }
      >
        EDIT PROFILE
      </OaaButton>

      <OaaButton
        variant="secondary"
        className="mt-4"
        onPress={() =>
          router.push('/profile/settings')
        }
      >
        ACCOUNT SETTINGS
      </OaaButton>

      <OaaButton
        variant="danger"
        className="mt-7"
        loading={loading}
        onPress={handleLogout}
      >
        SIGN OUT
      </OaaButton>
    </Screen>
  );
}

function InfoRow({
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
      className={`flex-row items-center justify-between py-4 ${last
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