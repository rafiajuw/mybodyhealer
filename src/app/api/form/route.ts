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

    const data = await request.formData();
    const type = data.get("type")?.toString().trim().toLowerCase();

    if (!type) return NextResponse.json({ success: false, message: "Form type missing." }, { status: 400 });

    const name = data.get("name")?.toString().trim() || "Not Provided";
    const email = data.get("email")?.toString().trim() || "Not Provided";
    const phone = data.get("phone")?.toString().trim() || "Not Provided";
    const message = data.get("message")?.toString().trim() || "Not Provided";

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
      tls: { rejectUnauthorized: false },
    });

    let subject = "";
    let html = "";
    let attachments: any[] = [];

    // ✅ ORDER FORM
    if (type === "order") {
      const product = data.get("product")?.toString().trim() || "Not provided";
      subject = `🛒 Order Request - ${name}`;
      html = `
        <h2>Order Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    }

    // ✅ CAREER FORM
    if (type === "career") {
      const resume = data.get("resume") as File | null;
      if (resume) {
        attachments.push({
          filename: resume.name,
          content: Buffer.from(await resume.arrayBuffer()),
        });
      }
      subject = `🧑‍💼 Career Application - ${name}`;
      html = `
        <h2>Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Cover Message:</strong> ${message}</p>
      `;
    }

    // ✅ CONTACT FORM
    if (type === "contact") {
      subject = `📩 New Contact Message - ${name}`;
      html = `
        <h2>Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    }

    // ✅ MEDICAL FORM
    if (type === "medical") {
      const age = data.get("age")?.toString().trim() || "Not Provided";
      const condition = data.get("condition")?.toString().trim() || "Not Provided";

      subject = `🩺 Medical Consultation - ${name}`;
      html = `
        <h2>Medical Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Condition / Problem:</strong> ${condition}</p>
        <p><strong>Additional Message:</strong> ${message}</p>
      `;
    }

    await transporter.sendMail({
      from: `"MyBodyHealer" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject,
      html,
      attachments,
    });

    return NextResponse.json({ success: true, message: "✅ Message Sent Successfully!" });
  } catch (err) {
    console.log("MAIL ERROR:", err);
    return NextResponse.json({ success: false, message: "❌ Mail Send Failed" }, { status: 500 });
  }
}
