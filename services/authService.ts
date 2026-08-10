import { supabase } from '@/lib/supabase';
import type {
  AppUser,
  UserGender,
  UserRole,
} from '@/types/user';

interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ProfileRow {
  id: string;
  email: string;
  role: UserRole;

  display_name: string;
  photo_url: string | null;

  birth_date: string | null;
  gender: UserGender | null;

  school: string | null;
  grade_level: string | null;

  height_cm: number | null;
  weight_kg: number | null;

  created_at: string;
  updated_at: string;
}

function mapProfileRow(row: ProfileRow): AppUser {
  return {
    uid: row.id,
    email: row.email,
    role: row.role,

    profile: {
      displayName: row.display_name,
      photoURL: row.photo_url,

      birthDate: row.birth_date,
      gender: row.gender,

      school: row.school,
      gradeLevel: row.grade_level,

      heightCm: row.height_cm,
      weightKg: row.weight_kg,
    },

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function registerUser({
  email,
  password,
  displayName,
}: RegisterInput) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        display_name: displayName.trim(),
      },
    },
  });

  if (error) {
    throw error;
  }

  return data.user;
}

export async function loginUser({
  email,
  password,
}: LoginInput) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getAppUser(
  uid: string,
): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      email,
      role,
      display_name,
      photo_url,
      birth_date,
      gender,
      school,
      grade_level,
      height_cm,
      weight_kg,
      created_at,
      updated_at
    `)
    .eq('id', uid)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapProfileRow(data as ProfileRow);
}