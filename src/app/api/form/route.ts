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

    // ✅ Get JSON instead of FormData
    const body = await request.json();

    const type = body.type?.toString().trim().toLowerCase() || "contact";
    const name = body.name?.toString().trim();
    const email = body.email?.toString().trim();
    const phone = body.phone?.toString().trim() || "Not provided";
    const message = body.message?.toString().trim() || "No message";
    const base64File = body.resume || null; // career form case

    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name & Email required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email." }, { status: 400 });
    }

    let attachments: any[] = [];
    if (type === "career" && base64File) {
      attachments.push({
        filename: "resume.pdf",
        content: Buffer.from(base64File.split(",")[1], "base64"),
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify().catch(() => {});

    let mailSubject = "";
    let htmlBody = "";

    switch (type) {
      case "order":
        mailSubject = `🛒 Order Request from ${name}`;
        htmlBody = `
            <h3>New Product Order Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `;
        break;

      case "career":
        mailSubject = `🧑‍💼 Career Application: ${name}`;
        htmlBody = `
            <h3>New Job Application</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `;
        break;

      case "medical":
        mailSubject = `🩺 Medical Consultation Request: ${name}`;
        htmlBody = `
            <h3>Medical Consultation Form</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `;
        break;

      default: // contact
        mailSubject = `📩 Contact Form Message from ${name}`;
        htmlBody = `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
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
