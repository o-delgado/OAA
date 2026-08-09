import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';
import type { AppUser } from '@/types/user';

interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser({
  email,
  password,
  displayName,
}: RegisterInput) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  const userData: Omit<AppUser, 'createdAt' | 'updatedAt'> = {
    uid: credential.user.uid,
    email: credential.user.email ?? email.trim(),
    displayName: displayName.trim(),
    role: 'user',
  };

  await setDoc(doc(db, 'users', credential.user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return credential.user;
}

export async function loginUser({
  email,
  password,
}: LoginInput) {
  return signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
}

export async function logoutUser() {
  return signOut(auth);
}

export async function getAppUser(
  uid: string,
): Promise<AppUser | null> {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as AppUser;
}