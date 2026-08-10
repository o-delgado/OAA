import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

import type {
  AbilityCategory,
  OverallAbility,
} from "../_shared/types/oaa/ability.ts";

import type {
  ScoreSource,
  ScoreSourceType,
  VerificationStatus,
} from "../_shared/types/oaa/assessment.ts";

import type {
  AbilityRank,
} from "../_shared/types/oaa/rank.ts";

import {
  hasOaaChanged,
} from "../_shared/oaa/history.ts";

import {
  recalculateOaa,
} from "../_shared/oaa/recalculateOaa.ts";

interface ScoreSourceRow {
  id: string;
  user_id: string;

  category:
    | "academic"
    | "physical"
    | "adaptability"
    | "social_contribution";

  source_type:
    | "in_app_assessment"
    | "real_world_result"
    | "real_world_activity";

  raw_score: number | null;
  normalized_score: number | null;

  verification_status:
    | "draft"
    | "pending"
    | "verified"
    | "rejected";

  created_at: string;
  verified_at: string | null;
}

interface OaaCurrentRow {
  user_id: string;

  academic_score: number | null;
  academic_rank: string | null;
  academic_state:
    OverallAbility["academic"]["state"];

  physical_score: number | null;
  physical_rank: string | null;
  physical_state:
    OverallAbility["physical"]["state"];

  adaptability_score: number | null;
  adaptability_rank: string | null;
  adaptability_state:
    OverallAbility["adaptability"]["state"];

  social_contribution_score: number | null;
  social_contribution_rank: string | null;
  social_contribution_state:
    OverallAbility["socialContribution"]["state"];

  overall_score: number | null;
  overall_rank: string | null;
  overall_state: OverallAbility["state"];

  updated_at: string;
}

const VALID_RANKS: AbilityRank[] = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "E+",
  "E",
  "E-",
  "F",
];

function mapRank(
  rank: string | null,
): AbilityRank | null {
  if (rank === null) {
    return null;
  }

  if (VALID_RANKS.includes(rank as AbilityRank)) {
    return rank as AbilityRank;
  }

  throw new Error(
    `Invalid ability rank stored in database: ${rank}`,
  );
}

function mapCategory(
  category: ScoreSourceRow["category"],
): AbilityCategory {
  if (category === "social_contribution") {
    return "socialContribution";
  }

  return category;
}

function mapScoreSource(
  row: ScoreSourceRow,
): ScoreSource {
  return {
    id: row.id,
    userId: row.user_id,

    category: mapCategory(row.category),

    sourceType:
      row.source_type as ScoreSourceType,

    rawScore: row.raw_score,
    normalizedScore: row.normalized_score,

    verificationStatus:
      row.verification_status as VerificationStatus,

    createdAt: row.created_at,
    verifiedAt: row.verified_at,
  };
}

function mapCurrentRow(
  row: OaaCurrentRow,
): OverallAbility {
  return {
    score: row.overall_score,
    rank: mapRank(row.overall_rank),
    state: row.overall_state,

    academic: {
      category: "academic",
      score: row.academic_score,
      rank: mapRank(row.academic_rank),
      state: row.academic_state,
      updatedAt: row.updated_at,
    },

    physical: {
      category: "physical",
      score: row.physical_score,
      rank: mapRank(row.physical_rank),
      state: row.physical_state,
      updatedAt: row.updated_at,
    },

    adaptability: {
      category: "adaptability",
      score: row.adaptability_score,
      rank: mapRank(row.adaptability_rank),
      state: row.adaptability_state,
      updatedAt: row.updated_at,
    },

    socialContribution: {
      category: "socialContribution",
      score: row.social_contribution_score,
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

export default {
  fetch: withSupabase(
    {
      auth: "user",
    },
    async (_req, ctx) => {
      try {
        const userId = ctx.userClaims?.id;

        if (!userId) {
          return Response.json(
            {
              error: "Unauthorized",
            },
            {
              status: 401,
            },
          );
        }

        const {
          data: sourceRows,
          error: sourceError,
        } = await ctx.supabaseAdmin
          .from("score_sources")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", {
            ascending: true,
          });

        if (sourceError) {
          throw sourceError;
        }

        const sources = (
          sourceRows as ScoreSourceRow[]
        ).map(mapScoreSource);

        const current = recalculateOaa({
          sources,
        });

        const {
          data: previousRow,
          error: previousError,
        } = await ctx.supabaseAdmin
          .from("oaa_current")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (previousError) {
          throw previousError;
        }

        const previous = previousRow
          ? mapCurrentRow(
              previousRow as OaaCurrentRow,
            )
          : null;

        const changed =
          hasOaaChanged(previous, current);

        const updatedAt =
          new Date().toISOString();

        const {
          error: currentError,
        } = await ctx.supabaseAdmin
          .from("oaa_current")
          .upsert({
            user_id: userId,

            academic_score:
              current.academic.score,
            academic_rank:
              current.academic.rank,
            academic_state:
              current.academic.state,

            physical_score:
              current.physical.score,
            physical_rank:
              current.physical.rank,
            physical_state:
              current.physical.state,

            adaptability_score:
              current.adaptability.score,
            adaptability_rank:
              current.adaptability.rank,
            adaptability_state:
              current.adaptability.state,

            social_contribution_score:
              current.socialContribution.score,

            social_contribution_rank:
              current.socialContribution.rank,

            social_contribution_state:
              current.socialContribution.state,

            overall_score:
              current.score,
            overall_rank:
              current.rank,
            overall_state:
              current.state,

            updated_at: updatedAt,
          });

        if (currentError) {
          throw currentError;
        }

        if (changed) {
          const {
            error: historyError,
          } = await ctx.supabaseAdmin
            .from("oaa_history")
            .insert({
              user_id: userId,

              academic_score:
                current.academic.score,
              academic_rank:
                current.academic.rank,
              academic_state:
                current.academic.state,

              physical_score:
                current.physical.score,
              physical_rank:
                current.physical.rank,
              physical_state:
                current.physical.state,

              adaptability_score:
                current.adaptability.score,
              adaptability_rank:
                current.adaptability.rank,
              adaptability_state:
                current.adaptability.state,

              social_contribution_score:
                current.socialContribution.score,

              social_contribution_rank:
                current.socialContribution.rank,

              social_contribution_state:
                current.socialContribution.state,

              overall_score:
                current.score,
              overall_rank:
                current.rank,
              overall_state:
                current.state,
            });

          if (historyError) {
            throw historyError;
          }
        }

        return Response.json({
          success: true,

          changed,

          oaa: {
            ...current,
            updatedAt,
          },
        });
      } catch (error) {
        console.error(
          "OAA recalculation error:",
          error,
        );

        return Response.json(
          {
            error:
              "Unable to recalculate OAA.",
          },
          {
            status: 500,
          },
        );
      }
    },
  ),
};