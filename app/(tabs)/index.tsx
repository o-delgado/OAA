import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/providers/AuthProvider';
import { getCurrentOaa } from '@/services/oaaService';
import type { OverallAbility } from '@/types/oaa/ability';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const { authUser } = useAuth();

  const [oaa, setOaa] =
    useState<OverallAbility | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadOaa = useCallback(async () => {
    if (!authUser) {
      setOaa(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const currentOaa =
        await getCurrentOaa(authUser.id);

      setOaa(currentOaa);
    } catch (error) {
      console.error(
        'Unable to load current OAA:',
        error,
      );

      setError(
        'Unable to load OAA data.',
      );
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useFocusEffect(
  useCallback(() => {
    void loadOaa();
  }, [loadOaa]),
);
  const overallScore =
    oaa?.score !== null &&
    oaa?.score !== undefined
      ? oaa.score.toFixed(2)
      : '--';

  const overallRank =
    oaa?.rank ?? '--';

  const overallState =
    formatState(
      oaa?.state ?? 'not_evaluated',
    );

  return (
    <Screen>
      <OaaText
        variant="caption"
        className="text-oaa-primary"
      >
        ADVANCED NURTURING SYSTEM
      </OaaText>

      <OaaText
        variant="title"
        className="mt-2"
      >
        OAA
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Overall Ability Assessment
      </OaaText>

      <OaaCard className="mt-8">
        <OaaText variant="section">
          OVERALL ABILITY
        </OaaText>

        {loading ? (
          <OaaText
            variant="display"
            className="mt-4"
          >
            ...
          </OaaText>
        ) : (
          <>
            <View className="mt-4 flex-row items-end">
              <OaaText variant="display">
                {overallRank}
              </OaaText>

              <OaaText
                variant="title"
                className="ml-4 mb-1 text-oaa-primary"
              >
                {overallScore}
              </OaaText>
            </View>

            <OaaText
              variant="caption"
              className="mt-2"
            >
              {overallState}
            </OaaText>
          </>
        )}
      </OaaCard>

      {!loading && oaa && (
        <View className="mt-4">
          <AbilityCard
            label="ACADEMIC ABILITY"
            rank={oaa.academic.rank}
            score={oaa.academic.score}
            state={oaa.academic.state}
          />

          <AbilityCard
            label="PHYSICAL ABILITY"
            rank={oaa.physical.rank}
            score={oaa.physical.score}
            state={oaa.physical.state}
          />

          <AbilityCard
            label="ADAPTABILITY"
            rank={oaa.adaptability.rank}
            score={oaa.adaptability.score}
            state={oaa.adaptability.state}
          />

          <AbilityCard
            label="SOCIAL CONTRIBUTION"
            rank={oaa.socialContribution.rank}
            score={
              oaa.socialContribution.score
            }
            state={
              oaa.socialContribution.state
            }
          />
        </View>
      )}

      {!loading && !oaa && !error && (
        <OaaCard className="mt-4">
          <OaaText variant="section">
            ASSESSMENT STATUS
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-3"
          >
            No OAA data available yet.
          </OaaText>
        </OaaCard>
      )}

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
    </Screen>
  );
}

function AbilityCard({
  label,
  rank,
  score,
  state,
}: {
  label: string;
  rank: string | null;
  score: number | null;
  state: string;
}) {
  const formattedScore =
    score !== null
      ? score.toFixed(2)
      : '--';

  return (
    <OaaCard className="mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <OaaText variant="section">
            {label}
          </OaaText>

          <OaaText
            variant="caption"
            className="mt-2"
          >
            {formatState(state)}
          </OaaText>
        </View>

        <View className="ml-4 items-end">
          <OaaText
            variant="title"
            className="text-oaa-primary"
          >
            {rank ?? '--'}
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-1"
          >
            {formattedScore}
          </OaaText>
        </View>
      </View>
    </OaaCard>
  );
}

function formatState(
  state: string,
): string {
  return state
    .replaceAll('_', ' ')
    .toUpperCase();
}