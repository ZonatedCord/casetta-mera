type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  children?: number;
  dogs?: number;
};

type Env = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  NOTIFY_TO_EMAIL?: string;
};

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const normalize = (value: unknown) => String(value ?? '').trim();

const buildTextBody = (
  payload: Required<Pick<InquiryPayload, 'name' | 'email' | 'message'>> &
    Omit<InquiryPayload, 'name' | 'email' | 'message'>,
  meta: { ip?: string; userAgent?: string; receivedAt: string }
) => {
  const lines = [
    'Nuova richiesta dal sito Casetta di Mera',
    '',
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Telefono: ${payload.phone ?? 'n/d'}`,
    `Check-in: ${payload.checkIn ?? 'n/d'}`,
    `Check-out: ${payload.checkOut ?? 'n/d'}`,
    `Ospiti: ${payload.guests ?? 'n/d'}`,
    `Bambini: ${payload.children ?? 'n/d'}`,
    `Cani: ${payload.dogs ?? 'n/d'}`,
    '',
    'Messaggio:',
    payload.message,
    '',
    `Data/Ora: ${meta.receivedAt}`,
    `IP: ${meta.ip ?? 'n/d'}`,
    `User-Agent: ${meta.userAgent ?? 'n/d'}`,
  ];

  return lines.join('\n');
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = env.RESEND_API_KEY;
  const notifyToEmail = env.NOTIFY_TO_EMAIL;

  if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey || !notifyToEmail) {
    return jsonResponse(500, {
      ok: false,
      error: 'Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, or NOTIFY_TO_EMAIL',
    });
  }

  let payload: InquiryPayload;
  try {
    payload = await request.json();
  } catch (error) {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON body' });
  }

  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const message = normalize(payload.message);

  if (!name || !email || !message) {
    return jsonResponse(400, { ok: false, error: 'Missing required fields' });
  }

  const userAgent = request.headers.get('user-agent') ?? undefined;
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers
      .get('x-forwarded-for')
      ?.split(',')[0]
      ?.trim();
  const receivedAt = new Date().toISOString();

  const text = buildTextBody(
    {
      ...payload,
      name,
      email,
      message,
    },
    { ip, userAgent, receivedAt }
  );

  const entityRef = crypto.randomUUID();

  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name,
      email,
      phone: payload.phone ?? null,
      message,
      check_in: payload.checkIn ?? null,
      check_out: payload.checkOut ?? null,
      guests: payload.guests ?? null,
      children: payload.children ?? null,
      dogs: payload.dogs ?? null,
      source: 'form',
      status: 'new',
    }),
  });

  if (!insertResponse.ok) {
    return jsonResponse(500, { ok: false, error: 'Supabase insert failed' });
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
      'X-Entity-Ref-ID': entityRef,
    },
    body: JSON.stringify({
      from: 'Casetta di Mera <onboarding@resend.dev>',
      to: [notifyToEmail],
      reply_to: email,
      subject: '📩 Nuova richiesta dal sito – Casetta di Mera',
      text,
      html: `<p>Nuova richiesta dal sito Casetta di Mera.</p><p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Telefono:</strong> ${payload.phone ?? 'n/d'}</p><p><strong>Check-in:</strong> ${payload.checkIn ?? 'n/d'}</p><p><strong>Check-out:</strong> ${payload.checkOut ?? 'n/d'}</p><p><strong>Ospiti:</strong> ${payload.guests ?? 'n/d'}</p><p><strong>Bambini:</strong> ${payload.children ?? 'n/d'}</p><p><strong>Cani:</strong> ${payload.dogs ?? 'n/d'}</p><p><strong>Messaggio:</strong><br/>${message}</p><p><strong>Data/Ora:</strong> ${receivedAt}<br/><strong>IP:</strong> ${ip ?? 'n/d'}<br/><strong>User-Agent:</strong> ${userAgent ?? 'n/d'}</p>`,
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse(500, { ok: false, error: 'Resend error' });
  }

  return jsonResponse(200, { ok: true });
};
