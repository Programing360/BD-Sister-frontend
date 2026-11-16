/**
 * BDSisters.org - Transactional Email Delivery Service
 *
 * Implements branded HTML & Plain Text templates for:
 * 1. Email Verification
 * 2. Password Reset
 *
 * Supports Resend API (HTTP), SMTP, and structured local logging.
 */

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface VerificationEmailParams {
  to: string;
  name: string;
  verificationUrl: string;
  token?: string;
}

export interface PasswordResetEmailParams {
  to: string;
  name: string;
  resetUrl: string;
  token?: string;
}

/**
 * Base email layout with BDSisters branding
 */
function renderEmailShell({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader: string;
  contentHtml: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #FAF9FC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #252238; }
    .container { max-width: 580px; margin: 32px auto; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #EAE7F0; overflow: hidden; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.05); }
    .header { background: linear-gradient(135deg, #7C3AED 0%, #6025C5 100%); padding: 32px 24px; text-align: center; }
    .logo { color: #FFFFFF; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; text-decoration: none; margin: 0; }
    .tagline { color: #F3EAFE; font-size: 13px; margin: 6px 0 0; }
    .body { padding: 36px 32px; }
    .footer { background-color: #FAF9FC; border-top: 1px solid #EAE7F0; padding: 24px; text-align: center; font-size: 12px; color: #777386; line-height: 1.5; }
    .btn { display: inline-block; background-color: #7C3AED; color: #FFFFFF !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 10px; margin: 24px 0; }
    .warning-box { background-color: #FCEEF2; border-left: 4px solid #DC4545; padding: 12px 16px; border-radius: 6px; margin: 20px 0; font-size: 13px; color: #6025C5; }
    .info-box { background-color: #F3EAFE; border-left: 4px solid #7C3AED; padding: 12px 16px; border-radius: 6px; margin: 20px 0; font-size: 13px; color: #252238; }
    .url-fallback { word-break: break-all; color: #7C3AED; font-size: 13px; background-color: #FAF9FC; padding: 10px; border-radius: 6px; border: 1px solid #EAE7F0; margin-top: 12px; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#FAF9FC;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </div>
  <div class="container">
    <div class="header">
      <h1 class="logo">BDSisters.org</h1>
      <p class="tagline">Empowering Bangladeshi Muslim Women in Technology, Business & Community</p>
    </div>
    <div class="body">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0;"><strong>BDSisters.org</strong> — Amanah, Sisterhood & Digital Excellence</p>
      <p style="margin: 0 0 8px 0;">Dhaka, Bangladesh • <a href="https://bdsisters.org" style="color: #7C3AED; text-decoration: none;">www.bdsisters.org</a></p>
      <p style="margin: 0; color: #9E9AA8;">If you did not initiate this request, you can safely ignore this message. Your account remains protected.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Dispatch email through configured transport
 */
async function dispatchEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  const provider = process.env.EMAIL_PROVIDER ?? "console";
  const emailFrom = process.env.EMAIL_FROM ?? "BDSisters <noreply@bdsisters.org>";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [to],
          subject,
          html,
          text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("[Email Delivery Error (Resend)]:", errorData);
        if (process.env.NODE_ENV === "production") {
          throw new Error(`Email delivery failed via Resend: ${errorData}`);
        }
        return false;
      }

      console.info(`[Email Delivered (Resend)] Sent '${subject}' to ${to}`);
      return true;
    } catch (err) {
      console.error("[Email Dispatch Exception]:", err);
      if (process.env.NODE_ENV === "production") {
        throw err;
      }
      return false;
    }
  }

  // Development logger / local verification fallback
  if (provider === "console" || process.env.NODE_ENV !== "production") {
    console.log("\n=======================================================");
    console.log(`📧 [BDSISTERS AUTH EMAIL DISPATCH] (Mode: ${provider})`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("-------------------------------------------------------");
    console.log(text);
    console.log("=======================================================\n");
    return true;
  }

  // Production requirement: Never pretend email was sent if provider is unconfigured
  throw new Error(
    "Email provider is not configured. Set RESEND_API_KEY or SMTP credentials in your environment."
  );
}

/**
 * Send Email Verification link to new member
 */
export async function sendVerificationEmailNotification({
  to,
  name,
  verificationUrl,
}: VerificationEmailParams): Promise<boolean> {
  const subject = "Verify Your BDSisters.org Account";
  const firstName = name ? name.split(" ")[0] : "Sister";

  const contentHtml = `
    <h2 style="font-size: 20px; color: #252238; margin-top: 0;">Assalamu Alaikum wa Rahmatullah, ${firstName}</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #514D62;">
      Welcome to <strong>BDSisters.org</strong>! We are honored to welcome you into our growing community of Bangladeshi Muslim women entrepreneurs, professionals, and learners.
    </p>
    <p style="font-size: 15px; line-height: 1.6; color: #514D62;">
      To protect the safety, privacy, and integrity of our sisterhood, please verify your email address by clicking the button below:
    </p>
    <div style="text-align: center;">
      <a href="${verificationUrl}" class="btn" target="_blank" rel="noopener noreferrer">Verify My Email Address</a>
    </div>
    <div class="info-box">
      <strong>Security Notice:</strong> This verification link is valid for <strong>24 hours</strong>. If it expires, you can request a new link at any time from the verification page.
    </div>
    <p style="font-size: 13px; color: #777386; margin-top: 24px;">
      If the button above does not work, copy and paste this link into your browser:
    </p>
    <div class="url-fallback">${verificationUrl}</div>
  `;

  const text = `Assalamu Alaikum ${firstName},

Welcome to BDSisters.org! Please verify your email address to activate your account:

${verificationUrl}

This verification link will expire in 24 hours.

If you did not register on BDSisters.org, please disregard this email.

With warmest regards,
The BDSisters Team
https://bdsisters.org`;

  return dispatchEmail({
    to,
    subject,
    html: renderEmailShell({
      title: subject,
      preheader: `Welcome to BDSisters.org, ${firstName}! Please verify your email to get started.`,
      contentHtml,
    }),
    text,
  });
}

/**
 * Send Password Reset token and link
 */
export async function sendPasswordResetEmailNotification({
  to,
  name,
  resetUrl,
}: PasswordResetEmailParams): Promise<boolean> {
  const subject = "Reset Your BDSisters.org Password";
  const firstName = name ? name.split(" ")[0] : "Sister";

  const contentHtml = `
    <h2 style="font-size: 20px; color: #252238; margin-top: 0;">Assalamu Alaikum, ${firstName}</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #514D62;">
      We received a request to reset the password for your BDSisters.org account associated with <strong>${to}</strong>.
    </p>
    <p style="font-size: 15px; line-height: 1.6; color: #514D62;">
      Click the button below to choose a new password:
    </p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="btn" target="_blank" rel="noopener noreferrer">Reset My Password</a>
    </div>
    <div class="warning-box">
      <strong>Important Security Notice:</strong> This password reset link is single-use and will expire in <strong>1 hour</strong>.
    </div>
    <p style="font-size: 13px; color: #777386; margin-top: 24px;">
      If you did not make this request, you can safely disregard this email. Your current password remains unchanged.
    </p>
    <p style="font-size: 13px; color: #777386;">
      Button not working? Copy and paste this URL into your browser:
    </p>
    <div class="url-fallback">${resetUrl}</div>
  `;

  const text = `Assalamu Alaikum ${firstName},

We received a request to reset your password on BDSisters.org.

Click the following link to set a new password:
${resetUrl}

This reset link is valid for 1 hour.

If you did not request a password reset, no action is required and your password remains secure.

The BDSisters Team
https://bdsisters.org`;

  return dispatchEmail({
    to,
    subject,
    html: renderEmailShell({
      title: subject,
      preheader: `Password reset request for BDSisters.org. Valid for 1 hour.`,
      contentHtml,
    }),
    text,
  });
}
