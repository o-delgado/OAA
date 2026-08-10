import {
  FunctionsHttpError,
} from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

import type { Database } from '@/types/database';

import type {
  AbilityCategory,
  OverallAbility,
} from '@/types/oaa/ability';

import type {
  ScoreSource,
  ScoreSourceType,
  VerificationStatus,
} from '@/types/oaa/assessment';

import type {
  AbilityRank,
} from '@/types/oaa/rank';

type ScoreSourceRow =
  Database['public']['Tables']['score_sources']['Row'];

type OaaCurrentRow =
  Database['public']['Tables']['oaa_current']['Row'];

type OaaHistoryRow =
  Database['public']['Tables']['oaa_history']['Row'];

const VALID_RANKS: AbilityRank[] = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
  'E+',
  'E',
  'E-',
  'F',
];

function mapRank(
  rank: string | null,
): AbilityRank | null {
  if (rank === null) {
    return null;
  }

  if (
    VALID_RANKS.includes(
      rank as AbilityRank,
    )
  ) {
    return rank as AbilityRank;
  }

  throw new Error(
    `Invalid ability rank stored in database: ${rank}`,
  );
}

function mapCategory(
  category: ScoreSourceRow['category'],
): AbilityCategory {
  if (category === 'social_contribution') {
    return 'socialContribution';
  }

  return category;
}

function mapSourceType(
  sourceType: ScoreSourceRow['source_type'],
): ScoreSourceType {
  return sourceType;
}

function mapVerificationStatus(
  status: ScoreSourceRow['verification_status'],
): VerificationStatus {
  return status;
}

function mapScoreSource(
  row: ScoreSourceRow,
): ScoreSource {
  return {
    id: row.id,
    userId: row.user_id,

    category: mapCategory(row.category),

    sourceType:
      mapSourceType(row.source_type),

    rawScore: row.raw_score,

    normalizedScore:
      row.normalized_score,

    verificationStatus:
      mapVerificationStatus(
        row.verification_status,
      ),

    createdAt: row.created_at,

    verifiedAt: row.verified_at,
  };
}

function mapCurrentRowToOverall(
  row: OaaCurrentRow,
): OverallAbility {
  return {
    score: row.overall_score,
    rank: mapRank(row.overall_rank),
    state: row.overall_state,

    academic: {
      category: 'academic',
      score: row.academic_score,
      rank: mapRank(row.academic_rank),
      state: row.academic_state,
      updatedAt: row.updated_at,
    },

    physical: {
      category: 'physical',
      score: row.physical_score,
      rank: mapRank(row.physical_rank),
      state: row.physical_state,
      updatedAt: row.updated_at,
    },

    adaptability: {
      category: 'adaptability',
      score: row.adaptability_score,
      rank: mapRank(
        row.adaptability_rank,
      ),
      state: row.adaptability_state,
      updatedAt: row.updated_at,
    },

    socialContribution: {
      category: 'socialContribution',

      score:
        row.social_contribution_score,

      rank: mapRank(
        row.social_contribution_rank,
      ),

      state:
        row.social_contribution_state,

      updatedAt: row.updated_at,
    },

    updatedAt: row.updated_at,
  };
}

function mapHistoryRow(
  row: OaaHistoryRow,
) {
  return {
    id: row.id,
    userId: row.user_id,

    overall: {
      score: row.overall_score,
      rank: mapRank(row.overall_rank),
      state: row.overall_state,
    },

    academic: {
      score: row.academic_score,
      rank: mapRank(row.academic_rank),
      state: row.academic_state,
    },

    physical: {
      score: row.physical_score,
      rank: mapRank(row.physical_rank),
      state: row.physical_state,
    },

    adaptability: {
      score: row.adaptability_score,
      rank: mapRank(
        row.adaptability_rank,
      ),
      state: row.adaptability_state,
    },

    socialContribution: {
      score:
        row.social_contribution_score,

      rank: mapRank(
        row.social_contribution_rank,
      ),

      state:
        row.social_contribution_state,
    },

    createdAt: row.created_at,
  };
}

export interface OaaHistoryEntry {
  id: string;
  userId: string;

  overall: {
    score: number | null;
    rank: AbilityRank | null;
    state: OverallAbility['state'];
  };

  academic: {
    score: number | null;
    rank: AbilityRank | null;
    state: OverallAbility['academic']['state'];
  };

  physical: {
    score: number | null;
    rank: AbilityRank | null;
    state: OverallAbility['physical']['state'];
  };

  adaptability: {
    score: number | null;
    rank: AbilityRank | null;
    state: OverallAbility['adaptability']['state'];
  };

  socialContribution: {
    score: number | null;
    rank: AbilityRank | null;
    state:
      OverallAbility['socialContribution']['state'];
  };

  createdAt: string;
}

export async function getOaaHistory(
  userId: string,
): Promise<OaaHistoryEntry[]> {
  const { data, error } = await supabase
    .from('oaa_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data.map(mapHistoryRow);
}

export async function getScoreSources(
  userId: string,
): Promise<ScoreSource[]> {
  const { data, error } = await supabase
    .from('score_sources')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data.map(mapScoreSource);
}

export async function getCurrentOaa(
  userId: string,
): Promise<OverallAbility | null> {
  const { data, error } = await supabase
    .from('oaa_current')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapCurrentRowToOverall(data);
}

interface RecalculateOaaResponse {
  success: boolean;
  changed: boolean;
  oaa: OverallAbility;
}

export async function recalculateAndSaveOaa():
  Promise<RecalculateOaaResponse> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.access_token) {
    throw new Error(
      'No active session available.',
    );
  }

  const { data, error } =
    await supabase.functions.invoke(
      'recalculate-oaa',
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
        'recalculate-oaa response:',
        errorBody,
      );

      throw new Error(
        errorBody?.error ??
          'Unable to recalculate OAA.',
      );
    }

    throw error;
  }

  if (!data?.success || !data?.oaa) {
    throw new Error(
      'Invalid OAA recalculation response.',
    );
  }

  return data as RecalculateOaaResponse;
}