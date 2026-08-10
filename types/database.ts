export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      oaa_current: {
        Row: {
          academic_rank: string | null
          academic_score: number | null
          academic_state: Database["public"]["Enums"]["ability_state"]
          adaptability_rank: string | null
          adaptability_score: number | null
          adaptability_state: Database["public"]["Enums"]["ability_state"]
          overall_rank: string | null
          overall_score: number | null
          overall_state: Database["public"]["Enums"]["ability_state"]
          physical_rank: string | null
          physical_score: number | null
          physical_state: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank: string | null
          social_contribution_score: number | null
          social_contribution_state: Database["public"]["Enums"]["ability_state"]
          updated_at: string
          user_id: string
        }
        Insert: {
          academic_rank?: string | null
          academic_score?: number | null
          academic_state?: Database["public"]["Enums"]["ability_state"]
          adaptability_rank?: string | null
          adaptability_score?: number | null
          adaptability_state?: Database["public"]["Enums"]["ability_state"]
          overall_rank?: string | null
          overall_score?: number | null
          overall_state?: Database["public"]["Enums"]["ability_state"]
          physical_rank?: string | null
          physical_score?: number | null
          physical_state?: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank?: string | null
          social_contribution_score?: number | null
          social_contribution_state?: Database["public"]["Enums"]["ability_state"]
          updated_at?: string
          user_id: string
        }
        Update: {
          academic_rank?: string | null
          academic_score?: number | null
          academic_state?: Database["public"]["Enums"]["ability_state"]
          adaptability_rank?: string | null
          adaptability_score?: number | null
          adaptability_state?: Database["public"]["Enums"]["ability_state"]
          overall_rank?: string | null
          overall_score?: number | null
          overall_state?: Database["public"]["Enums"]["ability_state"]
          physical_rank?: string | null
          physical_score?: number | null
          physical_state?: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank?: string | null
          social_contribution_score?: number | null
          social_contribution_state?: Database["public"]["Enums"]["ability_state"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      oaa_history: {
        Row: {
          academic_rank: string | null
          academic_score: number | null
          academic_state: Database["public"]["Enums"]["ability_state"]
          adaptability_rank: string | null
          adaptability_score: number | null
          adaptability_state: Database["public"]["Enums"]["ability_state"]
          created_at: string
          id: string
          overall_rank: string | null
          overall_score: number | null
          overall_state: Database["public"]["Enums"]["ability_state"]
          physical_rank: string | null
          physical_score: number | null
          physical_state: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank: string | null
          social_contribution_score: number | null
          social_contribution_state: Database["public"]["Enums"]["ability_state"]
          user_id: string
        }
        Insert: {
          academic_rank?: string | null
          academic_score?: number | null
          academic_state: Database["public"]["Enums"]["ability_state"]
          adaptability_rank?: string | null
          adaptability_score?: number | null
          adaptability_state: Database["public"]["Enums"]["ability_state"]
          created_at?: string
          id?: string
          overall_rank?: string | null
          overall_score?: number | null
          overall_state: Database["public"]["Enums"]["ability_state"]
          physical_rank?: string | null
          physical_score?: number | null
          physical_state: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank?: string | null
          social_contribution_score?: number | null
          social_contribution_state: Database["public"]["Enums"]["ability_state"]
          user_id: string
        }
        Update: {
          academic_rank?: string | null
          academic_score?: number | null
          academic_state?: Database["public"]["Enums"]["ability_state"]
          adaptability_rank?: string | null
          adaptability_score?: number | null
          adaptability_state?: Database["public"]["Enums"]["ability_state"]
          created_at?: string
          id?: string
          overall_rank?: string | null
          overall_score?: number | null
          overall_state?: Database["public"]["Enums"]["ability_state"]
          physical_rank?: string | null
          physical_score?: number | null
          physical_state?: Database["public"]["Enums"]["ability_state"]
          social_contribution_rank?: string | null
          social_contribution_score?: number | null
          social_contribution_state?: Database["public"]["Enums"]["ability_state"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string
          display_name: string
          email: string
          gender: string | null
          grade_level: string | null
          height_cm: number | null
          id: string
          photo_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          school: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          display_name: string
          email: string
          gender?: string | null
          grade_level?: string | null
          height_cm?: number | null
          id: string
          photo_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          display_name?: string
          email?: string
          gender?: string | null
          grade_level?: string | null
          height_cm?: number | null
          id?: string
          photo_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      score_sources: {
        Row: {
          category: Database["public"]["Enums"]["ability_category"]
          created_at: string
          id: string
          normalized_score: number | null
          raw_score: number | null
          source_type: Database["public"]["Enums"]["score_source_type"]
          user_id: string
          verification_status: Database["public"]["Enums"]["verification_status"]
          verified_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["ability_category"]
          created_at?: string
          id?: string
          normalized_score?: number | null
          raw_score?: number | null
          source_type: Database["public"]["Enums"]["score_source_type"]
          user_id: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["ability_category"]
          created_at?: string
          id?: string
          normalized_score?: number | null
          raw_score?: number | null
          source_type?: Database["public"]["Enums"]["score_source_type"]
          user_id?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ability_category:
        | "academic"
        | "physical"
        | "adaptability"
        | "social_contribution"
      ability_state:
        | "not_evaluated"
        | "insufficient_data"
        | "pending_verification"
        | "evaluated"
      score_source_type:
        | "in_app_assessment"
        | "real_world_result"
        | "real_world_activity"
      user_role: "user" | "admin"
      verification_status: "draft" | "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      ability_category: [
        "academic",
        "physical",
        "adaptability",
        "social_contribution",
      ],
      ability_state: [
        "not_evaluated",
        "insufficient_data",
        "pending_verification",
        "evaluated",
      ],
      score_source_type: [
        "in_app_assessment",
        "real_world_result",
        "real_world_activity",
      ],
      user_role: ["user", "admin"],
      verification_status: ["draft", "pending", "verified", "rejected"],
    },
  },
} as const
