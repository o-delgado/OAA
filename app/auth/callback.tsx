import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackScreen() {
    const url = Linking.useURL();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            return;
        }

        const callbackUrl = url;

        async function handleAuthCallback() {
            try {
                setError(null);

                const parsedUrl = Linking.parse(callbackUrl);

                const accessToken =
                    typeof parsedUrl.queryParams?.access_token === 'string'
                        ? parsedUrl.queryParams.access_token
                        : null;

                const refreshToken =
                    typeof parsedUrl.queryParams?.refresh_token === 'string'
                        ? parsedUrl.queryParams.refresh_token
                        : null;

                if (accessToken && refreshToken) {
                    const { error: sessionError } =
                        await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                    if (sessionError) {
                        throw sessionError;
                    }
                }

                router.replace('/(tabs)');
            } catch {
                setError('Unable to complete email confirmation.');
            }
        }

        void handleAuthCallback();
    }, [url]);

    return (
        <Screen className="items-center justify-center">
            <OaaText
                variant="caption"
                className="text-oaa-primary"
            >
                OAA SYSTEM
            </OaaText>

            <OaaText
                variant="title"
                className="mt-3 text-center"
            >
                Confirming Account
            </OaaText>

            <OaaText
                variant="muted"
                className="mt-3 text-center"
            >
                {error ?? 'Validating your email...'}
            </OaaText>
        </Screen>
    );
}