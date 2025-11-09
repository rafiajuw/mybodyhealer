export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_TO"];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`❌ Missing env: ${envVar}`);
        return NextResponse.json({ success: false, message: "Server config error." }, { status: 500 });
      }
    }

    const formData = await request.formData();
    const type = formData.get("type")?.toString().trim().toLowerCase();

    if (!type || !["order", "career", "contact", "medical"].includes(type)) {
      return NextResponse.json({ success: false, message: "Invalid form type." }, { status: 400 });
    }

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim() || "Not provided";
    const message = formData.get("message")?.toString().trim() || "No message";

    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name & Email required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email." }, { status: 400 });
    }

    let attachments: any[] = [];
    if (type === "career") {
      const file = formData.get("resume") as File | null;
      if (file) {
        attachments.push({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        });
      }
    }

    // ✅ Correct cPanel SMTP Transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true, // SSL REQUIRED
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ✅ IMPORTANT FOR CPANEL
      },
    });

    await transporter.verify().catch(() => {});

    let mailSubject = "";
    let htmlBody = "";

    if (type === "order") {
      mailSubject = `🛒 Order Request from ${name}`;
      htmlBody = `
        <h3>New Product Order Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "career") {
      mailSubject = `🧑‍💼 Career Application: ${name}`;
      htmlBody = `
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "contact") {
      mailSubject = `📩 Contact Form Message from ${name}`;
      htmlBody = `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "medical") {
      mailSubject = `🩺 Medical Consultation Request: ${name}`;
      htmlBody = `
        <h3>Medical Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    await transporter.sendMail({
      from: `"MyBodyHealer" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: mailSubject,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true, message: "✅ Sent Successfully!" });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ success: false, message: "❌ Sending Failed" }, { status: 500 });
  }
}
