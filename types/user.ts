export type UserRole = 'user' | 'admin';

export type UserGender =
  | 'male'
  | 'female'
  | 'other'
  | 'prefer_not_to_say';

export interface UserProfile {
  displayName: string;
  photoURL: string | null;

  birthDate: string | null;
  gender: UserGender | null;

  school: string | null;
  gradeLevel: string | null;

  heightCm: number | null;
  weightKg: number | null;
}

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;

  profile: UserProfile;

  createdAt: string;
  updatedAt: string;
}