import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, organisation, email, phone, format, message } = body;

  if (!name || !organisation || !email || !format || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"agenticTOM" <${process.env.GMAIL_USER}>`,
    to: "marc.oliver.hauser@gmail.com",
    subject: `Speaking request: ${format} — ${name}, ${organisation}`,
    text: `Name: ${name}\nOrganisation: ${organisation}\nEmail: ${email}\nPhone: ${phone || "not provided"}\nFormat: ${format}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Organisation:</strong> ${organisation}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "not provided"}</p>
      <p><strong>Format:</strong> ${format}</p>
      <hr/>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
