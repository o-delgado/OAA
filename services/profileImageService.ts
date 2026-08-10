import { supabase } from '@/lib/supabase';

export async function uploadProfileImage(
  uid: string,
  uri: string,
) {
  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  const filePath = `${uid}/avatar.jpg`;

  const { error } = await supabase.storage
    .from('profile-images')
    .upload(filePath, arrayBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return filePath;
}

export async function getProfileImageUrl(
  filePath: string,
) {
  const { data, error } = await supabase.storage
    .from('profile-images')
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}