import type { VercelRequest, VercelResponse } from "@vercel/node";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET ?? "";
const RESEND_API_KEY   = process.env.RESEND_API_KEY ?? "";
const TO_EMAIL         = "guilhermelogli@hotmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { nome, empresa, segmento, telefone, mensagem, recaptchaToken } = req.body as Record<string, string>;

  if (!nome || !empresa || !segmento) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  // Verify reCAPTCHA
  if (RECAPTCHA_SECRET) {
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const captcha = await captchaRes.json() as { success: boolean; score?: number };
    if (!captcha.success || (captcha.score !== undefined && captcha.score < 0.5)) {
      return res.status(400).json({ error: "Verificação de segurança falhou. Tente novamente." });
    }
  }

  // Send email via Resend
  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "AXION ONE Site <contato@groupaxion.com.br>",
      to: TO_EMAIL,
      subject: `[Lead] ${nome} — ${empresa} (${segmento})`,
      html: `
        <h2 style="color:#0f172a">Novo lead pelo site</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px">
          <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:600;width:140px">Nome</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${nome}</td></tr>
          <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:600">Empresa</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${empresa}</td></tr>
          <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:600">Segmento</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${segmento}</td></tr>
          <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:600">Telefone</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${telefone || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:600">Mensagem</td><td style="padding:8px 12px">${mensagem || "—"}</td></tr>
        </table>
      `,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.json() as { message?: string };
    return res.status(500).json({ error: err.message ?? "Erro ao enviar e-mail." });
  }

  return res.status(200).json({ ok: true });
}
