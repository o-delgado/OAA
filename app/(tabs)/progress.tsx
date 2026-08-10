import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/providers/AuthProvider';
import {
  getCurrentOaa,
  getOaaHistory,
  type OaaHistoryEntry,
} from '@/services/oaaService';
import type { OverallAbility } from '@/types/oaa/ability';

export default function ProgressScreen() {
  const { authUser } = useAuth();

  const [currentOaa, setCurrentOaa] =
    useState<OverallAbility | null>(null);

  const [history, setHistory] =
    useState<OaaHistoryEntry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    if (!authUser) {
      setCurrentOaa(null);
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [current, historyEntries] =
        await Promise.all([
          getCurrentOaa(authUser.id),
          getOaaHistory(authUser.id),
        ]);

      setCurrentOaa(current);
      setHistory(historyEntries);
    } catch (error) {
      console.error(
        'Unable to load OAA progress:',
        error,
      );

      setError(
        'Unable to load progress data.',
      );
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useFocusEffect(
    useCallback(() => {
      void loadProgress();
    }, [loadProgress]),
  );

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
      >
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
          Progress
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-1"
        >
          Ability history and statistics
        </OaaText>

        {loading ? (
          <OaaCard className="mt-7">
            <OaaText variant="section">
              LOADING
            </OaaText>

            <OaaText
              variant="muted"
              className="mt-3"
            >
              Loading OAA progress...
            </OaaText>
          </OaaCard>
        ) : (
          <>
            <CurrentOaaCard
              oaa={currentOaa}
            />

            <CurrentAbilitiesCard
              oaa={currentOaa}
            />

            <OaaCard className="mt-4">
              <OaaText variant="section">
                OAA DEVELOPMENT
              </OaaText>

              <OaaText
                variant="muted"
                className="mt-3"
              >
                Historical chart will appear here.
              </OaaText>

              <OaaText
                variant="caption"
                className="mt-2"
              >
                {history.length} SNAPSHOT
                {history.length === 1 ? '' : 'S'}
              </OaaText>
            </OaaCard>

            <View className="mt-4">
              <OaaText variant="section">
                HISTORY
              </OaaText>

              {history.length === 0 ? (
                <OaaCard className="mt-3">
                  <OaaText variant="muted">
                    No historical data available yet.
                  </OaaText>
                </OaaCard>
              ) : (
                history.map((entry) => (
                  <HistoryCard
                    key={entry.id}
                    entry={entry}
                  />
                ))
              )}
            </View>
          </>
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
      </ScrollView>
    </Screen>
  );
}

function CurrentOaaCard({
  oaa,
}: {
  oaa: OverallAbility | null;
}) {
  const score =
    oaa?.score !== null &&
    oaa?.score !== undefined
      ? oaa.score.toFixed(2)
      : '--';

  return (
    <OaaCard className="mt-7">
      <OaaText variant="section">
        CURRENT OAA
      </OaaText>

      <View className="mt-4 flex-row items-end justify-between">
        <OaaText variant="display">
          {oaa?.rank ?? '--'}
        </OaaText>

        <OaaText
          variant="title"
          className="mb-1 text-oaa-primary"
        >
          {score}
        </OaaText>
      </View>

      <OaaText
        variant="caption"
        className="mt-2"
      >
        {formatState(
          oaa?.state ?? 'not_evaluated',
        )}
      </OaaText>
    </OaaCard>
  );
}

function CurrentAbilitiesCard({
  oaa,
}: {
  oaa: OverallAbility | null;
}) {
  return (
    <OaaCard className="mt-4">
      <OaaText variant="section">
        CURRENT ABILITIES
      </OaaText>

      <AbilityRow
        label="ACADEMIC"
        rank={oaa?.academic.rank ?? null}
        score={oaa?.academic.score ?? null}
      />

      <AbilityRow
        label="PHYSICAL"
        rank={oaa?.physical.rank ?? null}
        score={oaa?.physical.score ?? null}
      />

      <AbilityRow
        label="ADAPTABILITY"
        rank={
          oaa?.adaptability.rank ?? null
        }
        score={
          oaa?.adaptability.score ?? null
        }
      />

      <AbilityRow
        label="SOCIAL CONTRIBUTION"
        rank={
          oaa?.socialContribution.rank ??
          null
        }
        score={
          oaa?.socialContribution.score ??
          null
        }
        last
      />
    </OaaCard>
  );
}

function AbilityRow({
  label,
  rank,
  score,
  last = false,
}: {
  label: string;
  rank: string | null;
  score: number | null;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${
        last
          ? ''
          : 'border-b border-oaa-border'
      }`}
    >
      <OaaText variant="caption">
        {label}
      </OaaText>

      <View className="ml-4 flex-row items-center">
        <OaaText
          variant="section"
          className="text-oaa-primary"
        >
          {rank ?? '--'}
        </OaaText>

        <OaaText
          variant="muted"
          className="ml-4"
        >
          {score !== null
            ? score.toFixed(2)
            : '--'}
        </OaaText>
      </View>
    </View>
  );
}

function HistoryCard({
  entry,
}: {
  entry: OaaHistoryEntry;
}) {
  return (
    <OaaCard className="mt-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <OaaText variant="caption">
            {formatDate(entry.createdAt)}
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-2"
          >
            {formatState(
              entry.overall.state,
            )}
          </OaaText>
        </View>

        <View className="ml-4 items-end">
          <OaaText
            variant="title"
            className="text-oaa-primary"
          >
            {entry.overall.rank ?? '--'}
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-1"
          >
            {entry.overall.score !== null
              ? entry.overall.score.toFixed(2)
              : '--'}
          </OaaText>
        </View>
      </View>

      <View className="mt-4 border-t border-oaa-border pt-4">
        <HistoryAbilityRow
          label="ACADEMIC"
          score={entry.academic.score}
        />

        <HistoryAbilityRow
          label="PHYSICAL"
          score={entry.physical.score}
        />

        <HistoryAbilityRow
          label="ADAPTABILITY"
          score={entry.adaptability.score}
        />

        <HistoryAbilityRow
          label="SOCIAL"
          score={
            entry.socialContribution.score
          }
          last
        />
      </View>
    </OaaCard>
  );
}

function HistoryAbilityRow({
  label,
  score,
  last = false,
}: {
  label: string;
  score: number | null;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row justify-between py-2 ${
        last ? '' : ''
      }`}
    >
      <OaaText variant="caption">
        {label}
      </OaaText>

      <OaaText variant="muted">
        {score !== null
          ? score.toFixed(2)
          : '--'}
      </OaaText>
    </View>
  );
}

function formatState(
  state: string,
): string {
  return state
    .replaceAll('_', ' ')
    .toUpperCase();
}

function formatDate(
  value: string,
): string {
  const date = new Date(value);

  return date.toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  );
}