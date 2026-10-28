import nodemailer from "nodemailer";

const RECIPIENT = "aroyer@solutionexpertise.ca";

const LIMITS = { user_name: 200, user_email: 200, user_phone: 50, user_specialty: 200, message: 5000 } as const;
type Field = keyof typeof LIMITS;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  const { ZOHO_SMTP_USER, ZOHO_SMTP_PASS } = process.env;
  if (!ZOHO_SMTP_USER || !ZOHO_SMTP_PASS) {
    console.error("[become-expert] ZOHO_SMTP_USER / ZOHO_SMTP_PASS manquants");
    return Response.json({ error: "Envoi non configuré" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = typeof body[field] === "string" ? (body[field] as string).trim() : "";
    if (value.length > LIMITS[field]) return Response.json({ error: "Champ trop long" }, { status: 400 });
    data[field] = value;
  }

  if (!data.user_name || !data.user_email || !data.user_phone || !data.user_specialty) {
    return Response.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) {
    return Response.json({ error: "Courriel invalide" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Nom", data.user_name],
    ["Courriel", data.user_email],
    ["Téléphone", data.user_phone],
    ["Spécialité", data.user_specialty],
    ["Message", data.message || "(aucun)"],
  ];

  const transporter = nodemailer.createTransport({
    host: "smtp.zohocloud.ca",
    port: 465,
    secure: true,
    auth: { user: ZOHO_SMTP_USER, pass: ZOHO_SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Site Solution Expertise" <${ZOHO_SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: data.user_email,
      subject: `Nouvelle candidature expert — ${data.user_name.replace(/[\r\n]/g, " ")}`,
      text: rows.map(([k, v]) => `${k} : ${v}`).join("\n"),
      html: `<h2>Nouvelle candidature « Devenir expert »</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
    });
    return Response.json({ success: true });
  } catch (err: any) {
    console.error("[become-expert] Échec envoi:", err?.message ?? err);
    return Response.json({ error: "Échec de l'envoi" }, { status: 502 });
  }
}
