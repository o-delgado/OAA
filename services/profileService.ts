import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/types/user';

interface ProfileUpdateRow {
  display_name?: string;
  photo_url?: string | null;

  birth_date?: string | null;
  gender?: UserProfile['gender'];

  school?: string | null;
  grade_level?: string | null;

  height_cm?: number | null;
  weight_kg?: number | null;

  updated_at: string;
}

export async function updateUserProfile(
  uid: string,
  profile: Partial<UserProfile>,
) {
  const updates: ProfileUpdateRow = {
    updated_at: new Date().toISOString(),
  };

  if (profile.displayName !== undefined) {
    updates.display_name = profile.displayName;
  }

  if (profile.photoURL !== undefined) {
    updates.photo_url = profile.photoURL;
  }

  if (profile.birthDate !== undefined) {
    updates.birth_date = profile.birthDate;
  }

  if (profile.gender !== undefined) {
    updates.gender = profile.gender;
  }

  if (profile.school !== undefined) {
    updates.school = profile.school;
  }

  if (profile.gradeLevel !== undefined) {
    updates.grade_level = profile.gradeLevel;
  }

  if (profile.heightCm !== undefined) {
    updates.height_cm = profile.heightCm;
  }

  if (profile.weightKg !== undefined) {
    updates.weight_kg = profile.weightKg;
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', uid);

  if (error) {
    throw error;
  }
}