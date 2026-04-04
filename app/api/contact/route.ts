import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, organisation, email, interest, message } = body;

  if (!name || !organisation || !email || !interest || !message) {
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
    subject: `agenticTOM: ${interest} — ${name}, ${organisation}`,
    text: `Name: ${name}\nOrganisation: ${organisation}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Organisation:</strong> ${organisation}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interested in:</strong> ${interest}</p>
      <hr/>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
