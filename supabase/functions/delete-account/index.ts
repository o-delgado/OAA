import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

export default {
  async fetch(req: Request) {
    if (req.method !== "POST") {
      return Response.json(
        {
          error: "Method not allowed",
        },
        {
          status: 405,
        },
      );
    }

    try {
      const authHeader =
        req.headers.get("Authorization");

      if (!authHeader?.startsWith("Bearer ")) {
        return Response.json(
          {
            error: "Missing authorization token",
          },
          {
            status: 401,
          },
        );
      }

      const supabaseUrl =
        Deno.env.get("SUPABASE_URL");

      const publishableKey =
        Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ??
        Deno.env.get("SUPABASE_ANON_KEY");

      const serviceRoleKey =
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (
        !supabaseUrl ||
        !publishableKey ||
        !serviceRoleKey
      ) {
        throw new Error(
          "Missing Supabase environment variables.",
        );
      }

      const userClient = createClient(
        supabaseUrl,
        publishableKey,
        {
          global: {
            headers: {
              Authorization: authHeader,
            },
          },
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        },
      );

      const {
        data: { user },
        error: userError,
      } = await userClient.auth.getUser();

      if (userError || !user) {
        console.error(
          "User authentication failed:",
          userError,
        );

        return Response.json(
          {
            error: "Unauthorized",
          },
          {
            status: 401,
          },
        );
      }

      const adminClient = createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        },
      );

      const {
        data: profile,
        error: profileError,
      } = await adminClient
        .from("profiles")
        .select("photo_url")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Unable to read profile:",
          profileError,
        );

        throw profileError;
      }

      if (profile?.photo_url) {
        const { error: storageError } =
          await adminClient.storage
            .from("profile-images")
            .remove([profile.photo_url]);

        if (storageError) {
          console.error(
            "Unable to delete profile image:",
            storageError,
          );

          throw storageError;
        }
      }

      const { error: deleteError } =
        await adminClient.auth.admin.deleteUser(
          user.id,
        );

      if (deleteError) {
        console.error(
          "Unable to delete auth user:",
          deleteError,
        );

        throw deleteError;
      }

      return Response.json({
        success: true,
      });
    } catch (error) {
  console.error(
    "Delete account error raw:",
    error,
  );

  let errorPayload: unknown = error;

  if (error && typeof error === "object") {
    errorPayload = {
      ...error,
      message:
        "message" in error
          ? String(error.message)
          : undefined,
      name:
        "name" in error
          ? String(error.name)
          : undefined,
    };
  }

  return Response.json(
    {
      error: errorPayload,
    },
    {
      status: 500,
    },
  );
}
  },
};