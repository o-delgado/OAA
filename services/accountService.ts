import {
    FunctionsHttpError,
} from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

export async function deleteAccount() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.access_token) {
    throw new Error('No active session.');
  }

  const { data, error } =
    await supabase.functions.invoke(
      'delete-account',
      {
        method: 'POST',
        headers: {
          Authorization:
            `Bearer ${session.access_token}`,
        },
      },
    );

  if (error) {
    if (error instanceof FunctionsHttpError) {
      const errorBody =
        await error.context.json();

      console.error(
        'delete-account response:',
        errorBody,
      );

      throw new Error(
        errorBody?.error ??
          'Unable to delete account.',
      );
    }

    throw error;
  }

  if (!data?.success) {
    throw new Error(
      data?.error ?? 'Unable to delete account.',
    );
  }

  await supabase.auth.signOut();
}