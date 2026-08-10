import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
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
import { useAuth } from '@/providers/AuthProvider';
import { uploadProfileImage } from '@/services/profileImageService';
import { updateUserProfile } from '@/services/profileService';
import type { UserGender } from '@/types/user';

export default function EditProfileScreen() {
  const {
    authUser,
    appUser,
    refreshAppUser,
  } = useAuth();

  const [displayName, setDisplayName] = useState(
    appUser?.profile.displayName ?? '',
  );

  const [school, setSchool] = useState(
    appUser?.profile.school ?? '',
  );

  const [gradeLevel, setGradeLevel] = useState(
    appUser?.profile.gradeLevel ?? '',
  );

  const [birthDate, setBirthDate] = useState(
    appUser?.profile.birthDate ?? '',
  );

  const [gender, setGender] =
    useState<UserGender | null>(
      appUser?.profile.gender ?? null,
    );

  const [heightCm, setHeightCm] = useState(
    appUser?.profile.heightCm?.toString() ?? '',
  );

  const [weightKg, setWeightKg] = useState(
    appUser?.profile.weightKg?.toString() ?? '',
  );

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  async function handleSelectImage() {
    try {
      setError(null);

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setError(
          'Photo library permission is required.',
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (result.canceled) {
        return;
      }

      setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.error(
        'Image selection error:',
        error,
      );

      setError('Unable to select image.');
    }
  }

  async function handleSave() {
    if (!authUser) {
      setError('User session not available.');
      return;
    }

    if (!displayName.trim()) {
      setError('Display name is required.');
      return;
    }

    if (
      birthDate.trim() &&
      !/^\d{4}-\d{2}-\d{2}$/.test(
        birthDate.trim(),
      )
    ) {
      setError(
        'Birth date must use YYYY-MM-DD.',
      );
      return;
    }

    const parsedHeight =
      heightCm.trim() === ''
        ? null
        : Number(heightCm);

    const parsedWeight =
      weightKg.trim() === ''
        ? null
        : Number(weightKg);

    if (
      parsedHeight !== null &&
      (!Number.isFinite(parsedHeight) ||
        parsedHeight <= 0)
    ) {
      setError('Enter a valid height.');
      return;
    }

    if (
      parsedWeight !== null &&
      (!Number.isFinite(parsedWeight) ||
        parsedWeight <= 0)
    ) {
      setError('Enter a valid weight.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let photoURL =
        appUser?.profile.photoURL ?? null;

      if (selectedImage) {
        photoURL = await uploadProfileImage(
          authUser.id,
          selectedImage,
        );
      }

      await updateUserProfile(authUser.id, {
        displayName: displayName.trim(),
        photoURL,

        school: school.trim() || null,
        gradeLevel:
          gradeLevel.trim() || null,

        birthDate:
          birthDate.trim() || null,

        gender,

        heightCm: parsedHeight,
        weightKg: parsedWeight,
      });

      await refreshAppUser();

      router.back();
    } catch (error) {
      console.error(
        'Profile update error:',
        error,
      );

      setError('Unable to update profile.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
            OAA PROFILE
          </OaaText>

          <OaaText
            variant="title"
            className="mt-2"
          >
            Edit Profile
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-2"
          >
            Personal information used throughout the OAA system.
          </OaaText>

          <View className="mt-8 items-center">
            <View className="h-28 w-28 overflow-hidden border border-oaa-primary bg-oaa-surface">
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  contentFit="cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Ionicons
                    name="person-outline"
                    size={42}
                    color="#20A9FF"
                  />
                </View>
              )}
            </View>

            <Pressable
              className="mt-4 border border-oaa-border bg-oaa-surface px-5 py-3"
              onPress={handleSelectImage}
            >
              <OaaText
                variant="caption"
                className="text-oaa-primary"
              >
                SELECT PHOTO
              </OaaText>
            </Pressable>
          </View>

          <View className="mt-8">
            <Field
              label="DISPLAY NAME"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Name"
            />

            <Field
              label="SCHOOL"
              value={school}
              onChangeText={setSchool}
              placeholder="School or institution"
            />

            <Field
              label="GRADE LEVEL"
              value={gradeLevel}
              onChangeText={setGradeLevel}
              placeholder="Example: 2nd year"
            />

            <Field
              label="BIRTH DATE"
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="YYYY-MM-DD"
              autoCapitalize="none"
            />

            <GenderSelector
              value={gender}
              onChange={setGender}
            />

            <Field
              label="HEIGHT (CM)"
              value={heightCm}
              onChangeText={setHeightCm}
              placeholder="170"
              keyboardType="numeric"
            />

            <Field
              label="WEIGHT (KG)"
              value={weightKg}
              onChangeText={setWeightKg}
              placeholder="65"
              keyboardType="decimal-pad"
            />
          </View>

          {error && (
            <View className="mt-2 border-l-2 border-oaa-danger bg-oaa-surface px-4 py-3">
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
            onPress={handleSave}
          >
            SAVE PROFILE
          </OaaButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences';
}

function Field({
  label,
  ...props
}: FieldProps) {
  return (
    <View className="mb-5">
      <OaaText variant="caption">
        {label}
      </OaaText>

      <TextInput
        className="mt-2 h-14 border border-oaa-border bg-oaa-surface px-4 text-base text-oaa-text"
        placeholderTextColor="#596A76"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}

function GenderSelector({
  value,
  onChange,
}: {
  value: UserGender | null;
  onChange: (value: UserGender) => void;
}) {
  return (
    <View className="mb-5">
      <OaaText variant="caption">
        GENDER
      </OaaText>

      <View className="mt-2">
        <GenderOption
          label="Male"
          selected={value === 'male'}
          onPress={() => onChange('male')}
        />

        <GenderOption
          label="Female"
          selected={value === 'female'}
          onPress={() => onChange('female')}
        />

        <GenderOption
          label="Other"
          selected={value === 'other'}
          onPress={() => onChange('other')}
        />

        <GenderOption
          label="Prefer not to say"
          selected={
            value === 'prefer_not_to_say'
          }
          onPress={() =>
            onChange('prefer_not_to_say')
          }
        />
      </View>
    </View>
  );
}

function GenderOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`mb-2 flex-row items-center justify-between border px-4 py-4 ${
        selected
          ? 'border-oaa-primary bg-oaa-surface'
          : 'border-oaa-border bg-oaa-background'
      }`}
      onPress={onPress}
    >
      <OaaText
        className={
          selected
            ? 'text-oaa-primary'
            : 'text-oaa-text'
        }
      >
        {label}
      </OaaText>

      <Ionicons
        name={
          selected
            ? 'radio-button-on'
            : 'radio-button-off'
        }
        size={20}
        color={
          selected ? '#20A9FF' : '#596A76'
        }
      />
    </Pressable>
  );
}