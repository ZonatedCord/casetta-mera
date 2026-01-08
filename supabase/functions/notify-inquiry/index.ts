import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-notify-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "n/d";
  }
  return escapeHtml(String(value));
};

const getClientIp = (req: Request) => {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ipFromForwarded = forwarded.split(",")[0]?.trim();
  return ipFromForwarded || req.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
};

const buildEmailHtml = (inquiry: Record<string, unknown>, adminUrl?: string) => {
  const rows = [
    ["ID", inquiry.id],
    ["Creato il", inquiry.created_at],
    ["Nome", inquiry.name],
    ["Email", inquiry.email],
    ["Telefono", inquiry.phone],
    ["Check-in", inquiry.check_in],
    ["Check-out", inquiry.check_out],
    ["Ospiti", inquiry.guests],
    ["Source", inquiry.source],
    ["Status", inquiry.status],
  ];

  const message = formatValue(inquiry.message);
  const adminLinkRow = adminUrl ? [["Apri admin", adminUrl]] : [];

  return `
    <div style="font-family: Arial, sans-serif; color: #1A3636;">
      <h2 style="margin: 0 0 12px;">Nuova richiesta</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${[...rows, ...adminLinkRow]
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 6px 10px; background: #f7f4ef; font-weight: 600; width: 160px;">
                    ${escapeHtml(String(label))}
                  </td>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #eee;">
                    ${
                      label === "Apri admin"
                        ? `<a href="${escapeHtml(String(value))}" style="color: #40534C;">${escapeHtml(
                            String(value)
                          )}</a>`
                        : formatValue(value)
                    }
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <div style="margin-top: 16px;">
        <h3 style="margin: 0 0 8px;">Messaggio</h3>
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const notifySecret = Deno.env.get("NOTIFY_SECRET");
  if (notifySecret && req.headers.get("x-notify-secret") !== notifySecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: { inquiryId?: string };
  try {
    body = await req.json();
  } catch (error) {
    console.error("Invalid JSON body", error);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const inquiryId = body.inquiryId?.trim();
  if (!inquiryId) {
    return new Response(JSON.stringify({ error: "Missing inquiryId" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const siteUrl = Deno.env.get("SITE_URL");

  const missingEnv: string[] = [];
  if (!serviceRoleKey) missingEnv.push("SERVICE_ROLE_KEY");
  if (!resendApiKey) missingEnv.push("RESEND_API_KEY");
  if (!supabaseUrl) missingEnv.push("SUPABASE_URL");

  if (missingEnv.length > 0) {
    console.error("Missing env vars", {
      missing: missingEnv,
      stack: new Error("Missing env vars").stack,
    });
    return new Response(JSON.stringify({ error: "missing_env", missing: missingEnv }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: inquiry, error: inquiryError } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", inquiryId)
    .single();

  if (inquiryError || !inquiry) {
    console.error("Inquiry fetch failed", {
      message: inquiryError?.message,
      details: inquiryError?.details,
      hint: inquiryError?.hint,
      code: inquiryError?.code,
      stack: inquiryError?.stack ?? new Error("Inquiry fetch failed").stack,
    });
    return new Response(
      JSON.stringify({
        error: "db_failed",
        details: {
          message: inquiryError?.message ?? "Inquiry not found",
          details: inquiryError?.details,
          hint: inquiryError?.hint,
          code: inquiryError?.code,
        },
      }),
      {
        status: inquiryError ? 500 : 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const createdAt = inquiry.created_at ? new Date(inquiry.created_at as string) : null;
  if (!createdAt || Number.isNaN(createdAt.getTime())) {
    return new Response(JSON.stringify({ error: "Invalid inquiry timestamp" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const now = Date.now();
  const createdAtMs = createdAt.getTime();
  if (now - createdAtMs > 5 * 60 * 1000) {
    return new Response(JSON.stringify({ error: "Inquiry too old" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: notificationRows, error: notificationError } = await supabase
    .from("inquiry_notifications")
    .upsert({ inquiry_id: inquiry.id }, { onConflict: "inquiry_id", ignoreDuplicates: true })
    .select("inquiry_id");

  if (notificationError) {
    console.error("Notification upsert failed", {
      message: notificationError?.message,
      details: notificationError?.details,
      hint: notificationError?.hint,
      code: notificationError?.code,
      stack: notificationError?.stack ?? new Error("Notification upsert failed").stack,
    });
    return new Response(
      JSON.stringify({
        error: "db_failed",
        details: {
          message: notificationError?.message,
          details: notificationError?.details,
          hint: notificationError?.hint,
          code: notificationError?.code,
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  if (!notificationRows || notificationRows.length === 0) {
    return new Response(JSON.stringify({ status: "skipped", reason: "already_notified" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (inquiry.name as string | null | undefined)?.trim() || "Senza nome";
  const checkInRaw = (inquiry.check_in as string | null | undefined)?.trim();
  const checkOutRaw = (inquiry.check_out as string | null | undefined)?.trim();
  const hasDates = Boolean(checkInRaw && checkOutRaw);
  const subject = hasDates
    ? `[Casetta Mera] Nuova richiesta: ${name} (${checkInRaw} → ${checkOutRaw})`
    : `[Casetta Mera] Nuova richiesta: ${name}`;
  const adminUrl = siteUrl ? `${siteUrl.replace(/\/$/, "")}/admin/inquiries` : undefined;
  const html = buildEmailHtml(inquiry, adminUrl);
  const replyTo =
    (inquiry.email as string | null | undefined)?.trim() || "barleramarco2@gmail.com";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Casetta Mera <noreply@casettamera.it>",
      to: ["barleramarco2@gmail.com"],
      replyTo,
      subject,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend API failed", {
      status: resendResponse.status,
      body: errorText,
      stack: new Error("Resend API failed").stack,
    });
    await supabase.from("inquiry_notifications").delete().eq("inquiry_id", inquiry.id);
    return new Response(
      JSON.stringify({
        error: "resend_failed",
        details: { status: resendResponse.status, body: errorText },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ status: "sent" }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
