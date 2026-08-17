import type { VercelRequest, VercelResponse } from "@vercel/node";

const RECAPTCHA_SECRET    = "6LdjNXctAAAAAEc1vjupYE2P1nTV9r1WWFmB69wf";
const EMAILJS_SERVICE_ID  = "service_bw4gtiq";
const EMAILJS_TEMPLATE_ID = "template_e5xn4uu";
const EMAILJS_PUBLIC_KEY  = "6eN2bud-1a-YPtmbM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { nome, empresa, segmento, telefone, mensagem, recaptchaToken } = req.body as Record<string, string>;

  if (!nome || !empresa || !segmento) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  // Verifica reCAPTCHA
  const captchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    { method: "POST" },
  );
  const captchaData = await captchaRes.json() as { success: boolean; score: number };

  if (!captchaData.success || captchaData.score < 0.5) {
    return res.status(400).json({ error: "Verificação de segurança falhou. Tente novamente." });
  }

  // Envia e-mail via EmailJS REST API
  const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: nome,
        empresa,
        segmento,
        telefone: telefone || "Não informado",
        mensagem: mensagem || "Sem mensagem adicional",
      },
    }),
  });

  if (!emailRes.ok) {
    return res.status(500).json({ error: "Erro ao enviar e-mail. Tente novamente." });
  }

  return res.status(200).json({ ok: true });
}
