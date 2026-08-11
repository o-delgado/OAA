import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import {
  useCallback,
  useState,
} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import {
  getCurrentOaa,
  getOaaHistory,
  type OaaHistoryEntry,
} from '@/services/oaaService';

import { OaaCard } from '@/components/OaaCard';
import { OaaRadarChart } from '@/components/OaaRadarChart';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/providers/AuthProvider';
import type {
  AbilityEvaluationState,
  OverallAbility,
} from '@/types/oaa/ability';
import type { AbilityRank } from '@/types/oaa/rank';

export default function HomeScreen() {
  const {
    authUser,
    appUser,
  } = useAuth();

  const [oaa, setOaa] =
    useState<OverallAbility | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [history, setHistory] =
    useState<OaaHistoryEntry[]>([]);

  const loadOaa = useCallback(
    async (showLoading = true) => {
      if (!authUser) {
        setOaa(null);
        setHistory([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      try {
        if (showLoading) {
          setLoading(true);
        }

        setError(null);

        const [currentOaa, historyEntries] =
          await Promise.all([
            getCurrentOaa(authUser.id),
            getOaaHistory(authUser.id),
          ]);

        setOaa(currentOaa);
        setHistory(historyEntries);
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
        setRefreshing(false);
      }
    },
    [authUser],
  );

  useFocusEffect(
    useCallback(() => {
      void loadOaa();
    }, [loadOaa]),
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    void loadOaa(false);
  }, [loadOaa]);

  const displayName =
    appUser?.profile.displayName ??
    'OAA User';

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#20A9FF"
          />
        }
      >
        <View className="pt-2">
          <OaaText
            variant="caption"
            className="text-oaa-primary"
          >
            ADVANCED NURTURING SYSTEM
          </OaaText>

          <View className="mt-3 flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <OaaText variant="title">
                OAA
              </OaaText>

              <OaaText
                variant="muted"
                className="mt-1"
              >
                Overall Ability Assessment
              </OaaText>
            </View>

            <View className="h-10 w-10 items-center justify-center border border-oaa-primary bg-oaa-surface">
              <Ionicons
                name="analytics-outline"
                size={20}
                color="#20A9FF"
              />
            </View>
          </View>
        </View>

        <OaaCard className="mt-7">
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center border border-oaa-border bg-oaa-background">
              <Ionicons
                name="person-outline"
                size={19}
                color="#20A9FF"
              />
            </View>

            <View className="flex-1">
              <OaaText variant="caption">
                STUDENT
              </OaaText>

              <OaaText
                className="mt-1 text-base font-semibold"
              >
                {displayName}
              </OaaText>

              <OaaText
                variant="muted"
                className="mt-1"
                numberOfLines={1}
              >
                {authUser?.email ?? 'No email'}
              </OaaText>
            </View>

            <View className="items-end">
              <OaaText
                variant="caption"
                className="text-oaa-primary"
              >
                ACTIVE
              </OaaText>

              <View className="mt-2 h-2 w-2 bg-oaa-success" />
            </View>
          </View>
        </OaaCard>

        {loading ? (
          <DashboardLoading />
        ) : !oaa ? (
          <NewUserState />
        ) : (
          <>
            <OverallCard oaa={oaa} />
            <OaaCard className="mt-4">
              <View className="flex-row items-center justify-between">
                <OaaText variant="section">
                  ABILITY ANALYSIS
                </OaaText>

                <OaaText
                  variant="caption"
                  className="text-oaa-primary"
                >
                  OAA PROFILE
                </OaaText>
              </View>

              <View className="mt-2 items-center">
                <OaaRadarChart
                  academic={oaa.academic.score}
                  physical={oaa.physical.score}
                  adaptability={
                    oaa.adaptability.score
                  }
                  socialContribution={
                    oaa.socialContribution.score
                  }
                />
              </View>
            </OaaCard>

            <RecentActivity history={history} />

            <View className="mt-4">
              <View className="mb-3 flex-row items-center justify-between">
                <OaaText variant="section">
                  ABILITY PROFILE
                </OaaText>
                <OaaText variant="caption">
                  4 CATEGORIES
                </OaaText>
              </View>

              <View className="flex-row flex-wrap justify-between">
                <AbilityCard
                  icon="school-outline"
                  label="ACADEMIC"
                  rank={oaa.academic.rank}
                  score={oaa.academic.score}
                  state={oaa.academic.state}
                />

                <AbilityCard
                  icon="fitness-outline"
                  label="PHYSICAL"
                  rank={oaa.physical.rank}
                  score={oaa.physical.score}
                  state={oaa.physical.state}
                />

                <AbilityCard
                  icon="git-branch-outline"
                  label="ADAPTABILITY"
                  rank={oaa.adaptability.rank}
                  score={oaa.adaptability.score}
                  state={oaa.adaptability.state}
                />

                <AbilityCard
                  icon="people-outline"
                  label="SOCIAL"
                  rank={
                    oaa.socialContribution.rank
                  }
                  score={
                    oaa.socialContribution.score
                  }
                  state={
                    oaa.socialContribution.state
                  }
                />
              </View>
            </View>

            <RecommendedImprovement
              oaa={oaa}
            />

            {oaa.state !== 'evaluated' && (
              <EvaluationStateCard
                state={oaa.state}
              />
            )}

            <OaaCard className="mt-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <OaaText variant="section">
                    SYSTEM STATUS
                  </OaaText>

                  <OaaText
                    variant="muted"
                    className="mt-2"
                  >
                    OAA data synchronized with the
                    assessment system.
                  </OaaText>
                </View>

                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color="#46C78A"
                />
              </View>

              <View className="mt-4 border-t border-oaa-border pt-4">
                <View className="flex-row items-center justify-between">
                  <OaaText variant="caption">
                    LAST UPDATED
                  </OaaText>

                  <OaaText
                    variant="caption"
                    className="ml-4 text-oaa-text"
                  >
                    {formatDateTime(
                      oaa.updatedAt,
                    )}
                  </OaaText>
                </View>
              </View>
            </OaaCard>
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

function OverallCard({
  oaa,
}: {
  oaa: OverallAbility;
}) {
  const score =
    oaa.score !== null
      ? oaa.score.toFixed(2)
      : '--';

  return (
    <OaaCard className="mt-4 overflow-hidden">
      <View className="flex-row items-center justify-between">
        <OaaText variant="section">
          OVERALL ABILITY
        </OaaText>

        <OaaText
          variant="caption"
          className={
            oaa.state === 'evaluated'
              ? 'text-oaa-success'
              : 'text-oaa-secondary'
          }
        >
          {formatState(oaa.state)}
        </OaaText>
      </View>

      <View className="mt-5 flex-row items-end justify-between">
        <View>
          <OaaText
            variant="display"
            className="text-oaa-primary"
          >
            {oaa.rank ?? '--'}
          </OaaText>

          <OaaText
            variant="caption"
            className="mt-2"
          >
            RANK
          </OaaText>
        </View>

        <View className="items-end">
          <OaaText
            variant="display"
            className="text-oaa-text"
          >
            {score}
          </OaaText>

          <OaaText
            variant="caption"
            className="mt-2"
          >
            SCORE / 100
          </OaaText>
        </View>
      </View>

      <View className="mt-5 h-px bg-oaa-border" />

      <View className="mt-4 flex-row items-center">
        <Ionicons
          name="pulse-outline"
          size={16}
          color="#20A9FF"
        />

        <OaaText
          variant="muted"
          className="ml-2"
        >
          Composite result from all four
          ability categories.
        </OaaText>
      </View>
    </OaaCard>
  );
}

function AbilityCard({
  icon,
  label,
  rank,
  score,
  state,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  rank: AbilityRank | null;
  score: number | null;
  state: AbilityEvaluationState;
}) {
  return (
    <View className="mb-3 w-[48.5%]">
      <OaaCard className="min-h-40">
        <View className="flex-row items-start justify-between">
          <View className="h-8 w-8 items-center justify-center border border-oaa-border bg-oaa-background">
            <Ionicons
              name={icon}
              size={16}
              color="#20A9FF"
            />
          </View>

          <OaaText
            variant="caption"
            className={
              state === 'evaluated'
                ? 'text-oaa-success'
                : ''
            }
          >
            {state === 'evaluated'
              ? 'READY'
              : 'PENDING'}
          </OaaText>
        </View>

        <OaaText
          variant="caption"
          className="mt-4"
        >
          {label}
        </OaaText>

        <View className="mt-3 flex-row items-end justify-between">
          <OaaText
            variant="title"
            className="text-oaa-primary"
          >
            {rank ?? '--'}
          </OaaText>

          <OaaText
            variant="muted"
            className="mb-1"
          >
            {score !== null
              ? score.toFixed(2)
              : '--'}
          </OaaText>
        </View>

        <OaaText
          variant="caption"
          className="mt-3"
          numberOfLines={1}
        >
          {formatState(state)}
        </OaaText>
      </OaaCard>
    </View>
  );
}

function DashboardLoading() {
  return (
    <>
      <OaaCard className="mt-4">
        <OaaText variant="section">
          OVERALL ABILITY
        </OaaText>

        <OaaText
          variant="display"
          className="mt-5 text-oaa-primary"
        >
          ...
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Loading assessment data...
        </OaaText>
      </OaaCard>

      <OaaCard className="mt-4">
        <OaaText variant="section">
          ABILITY PROFILE
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Synchronizing category scores.
        </OaaText>
      </OaaCard>
    </>
  );
}

function NewUserState() {
  return (
    <OaaCard className="mt-4">
      <View className="h-12 w-12 items-center justify-center border border-oaa-primary bg-oaa-background">
        <Ionicons
          name="analytics-outline"
          size={24}
          color="#20A9FF"
        />
      </View>

      <OaaText
        variant="section"
        className="mt-5"
      >
        OAA NOT AVAILABLE
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-3"
      >
        Your Overall Ability has not been
        established yet.
      </OaaText>

      <View className="mt-5 border-l-2 border-oaa-primary pl-4">
        <OaaText variant="caption">
          INITIAL ASSESSMENT REQUIRED
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-2"
        >
          Complete the initial assessment to
          generate your first official OAA.
        </OaaText>
      </View>
    </OaaCard>
  );
}

function EvaluationStateCard({
  state,
}: {
  state: AbilityEvaluationState;
}) {
  let title =
    'ASSESSMENT INCOMPLETE';

  let message =
    'Additional assessment data is required before an official Overall Ability can be generated.';

  if (state === 'pending_verification') {
    title = 'PENDING VERIFICATION';
    message =
      'One or more results are awaiting verification before your OAA can be finalized.';
  }

  if (state === 'not_evaluated') {
    title = 'NOT EVALUATED';
    message =
      'Required ability categories have not been evaluated yet.';
  }

  return (
    <OaaCard className="mb-4 border-oaa-primary">
      <View className="flex-row">
        <Ionicons
          name="information-circle-outline"
          size={22}
          color="#20A9FF"
        />

        <View className="ml-3 flex-1">
          <OaaText
            variant="section"
            className="text-oaa-primary"
          >
            {title}
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-2"
          >
            {message}
          </OaaText>
        </View>
      </View>
    </OaaCard>
  );
}

function RecommendedImprovement({
  oaa,
}: {
  oaa: OverallAbility;
}) {
  const abilities = [
    {
      key: 'academic',
      label: 'ACADEMIC ABILITY',
      shortLabel: 'Academic Ability',
      icon: 'school-outline' as const,
      score: oaa.academic.score,
      rank: oaa.academic.rank,
      state: oaa.academic.state,
    },
    {
      key: 'physical',
      label: 'PHYSICAL ABILITY',
      shortLabel: 'Physical Ability',
      icon: 'fitness-outline' as const,
      score: oaa.physical.score,
      rank: oaa.physical.rank,
      state: oaa.physical.state,
    },
    {
      key: 'adaptability',
      label: 'ADAPTABILITY',
      shortLabel: 'Adaptability',
      icon: 'git-branch-outline' as const,
      score: oaa.adaptability.score,
      rank: oaa.adaptability.rank,
      state: oaa.adaptability.state,
    },
    {
      key: 'social',
      label: 'SOCIAL CONTRIBUTION',
      shortLabel: 'Social Contribution',
      icon: 'people-outline' as const,
      score:
        oaa.socialContribution.score,
      rank:
        oaa.socialContribution.rank,
      state:
        oaa.socialContribution.state,
    },
  ];

  const evaluatedAbilities =
    abilities.filter(
      (ability) =>
        ability.state === 'evaluated' &&
        ability.score !== null,
    );

  if (evaluatedAbilities.length === 0) {
    return (
      <OaaCard className="mt-4">
        <OaaText variant="section">
          RECOMMENDED IMPROVEMENT
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Complete your ability assessments
          to receive an improvement
          recommendation.
        </OaaText>
      </OaaCard>
    );
  }

  const weakestAbility =
    evaluatedAbilities.reduce(
      (lowest, current) =>
        current.score! < lowest.score!
          ? current
          : lowest,
    );

  return (
    <OaaCard className="mt-4">
      <View className="flex-row items-center justify-between">
        <OaaText variant="section">
          RECOMMENDED IMPROVEMENT
        </OaaText>

        <Ionicons
          name="trending-up-outline"
          size={18}
          color="#20A9FF"
        />
      </View>

      <View className="mt-5 flex-row items-center">
        <View className="mr-4 h-12 w-12 items-center justify-center border border-oaa-primary bg-oaa-background">
          <Ionicons
            name={weakestAbility.icon}
            size={22}
            color="#20A9FF"
          />
        </View>

        <View className="flex-1">
          <OaaText variant="caption">
            PRIORITY AREA
          </OaaText>

          <OaaText
            className="mt-1 font-semibold"
          >
            {weakestAbility.label}
          </OaaText>
        </View>

        <View className="items-end">
          <OaaText
            variant="title"
            className="text-oaa-primary"
          >
            {weakestAbility.rank ?? '--'}
          </OaaText>

          <OaaText
            variant="muted"
            className="mt-1"
          >
            {weakestAbility.score!.toFixed(2)}
          </OaaText>
        </View>
      </View>

      <View className="mt-5 border-l-2 border-oaa-primary pl-4">
        <OaaText variant="caption">
          DEVELOPMENT PRIORITY
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-2"
        >
          Focus on improving{' '}
          {weakestAbility.shortLabel} to
          strengthen your overall OAA
          profile.
        </OaaText>
      </View>
    </OaaCard>
  );
}

function RecentActivity({
  history,
}: {
  history: OaaHistoryEntry[];
}) {
  const recentEntries = history.slice(0, 3);

  return (
    <OaaCard className="mt-4">
      <View className="flex-row items-center justify-between">
        <OaaText variant="section">
          RECENT ACTIVITY
        </OaaText>

        <Ionicons
          name="time-outline"
          size={18}
          color="#20A9FF"
        />
      </View>

      {recentEntries.length === 0 ? (
        <OaaText
          variant="muted"
          className="mt-4"
        >
          No recent OAA changes available.
        </OaaText>
      ) : (
        <View className="mt-3">
          {recentEntries.map(
            (entry, index) => (
              <ActivityRow
                key={entry.id}
                entry={entry}
                previous={
                  history[index + 1] ??
                  null
                }
                last={
                  index ===
                  recentEntries.length - 1
                }
              />
            ),
          )}
        </View>
      )}
    </OaaCard>
  );
}

function ActivityRow({
  entry,
  previous,
  last,
}: {
  entry: OaaHistoryEntry;
  previous: OaaHistoryEntry | null;
  last: boolean;
}) {
  const currentScore =
    entry.overall.score;

  const previousScore =
    previous?.overall.score ?? null;

  let difference: number | null = null;

  if (
    currentScore !== null &&
    previousScore !== null
  ) {
    difference =
      currentScore - previousScore;
  }

  const differenceText =
    difference === null
      ? 'INITIAL'
      : difference > 0
        ? `+${difference.toFixed(2)}`
        : difference.toFixed(2);

  const trendIcon:
    keyof typeof Ionicons.glyphMap =
    difference !== null && difference > 0
      ? 'trending-up-outline'
      : difference !== null &&
        difference < 0
        ? 'trending-down-outline'
        : 'analytics-outline';

  return (
    <View
      className={`flex-row items-center py-4 ${last
          ? ''
          : 'border-b border-oaa-border'
        }`}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center border border-oaa-border bg-oaa-background">
        <Ionicons
          name={trendIcon}
          size={17}
          color="#20A9FF"
        />
      </View>

      <View className="flex-1">
        <OaaText variant="caption">
          OAA UPDATE
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-1"
        >
          {formatDateTime(
            entry.createdAt,
          )}
        </OaaText>
      </View>

      <View className="ml-4 items-end">
        <OaaText
          variant="section"
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

        <OaaText
          variant="caption"
          className="mt-1"
        >
          {differenceText}
        </OaaText>
      </View>
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

function formatDateTime(
  value: string | null,
): string {
  if (!value) {
    return '--';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '--';
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}