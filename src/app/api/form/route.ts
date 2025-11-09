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
    const type = (formData.get("type") as string)?.trim()?.toLowerCase();

    if (!type || !["order", "career", "contact", "medical"].includes(type)) {
      return NextResponse.json({ success: false, message: "Invalid form type." }, { status: 400 });
    }

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || "Not provided";
    const message = (formData.get("message") as string)?.trim() || "No message";

    // ORDER FIELDS
    const productName = (formData.get("productName") as string)?.trim();
    const productDosage = (formData.get("productDosage") as string)?.trim();
    const productPackSize = (formData.get("productPackSize") as string)?.trim();

    // CAREER FIELDS
    const subject = (formData.get("subject") as string)?.trim() || "General";
    const file = formData.get("resume") as File | null;

    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name & Email required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email." }, { status: 400 });
    }

    let attachments: any[] = [];
    if (type === "career" && file) {
      attachments.push({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      });
    }

  const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});



    await transporter.verify();

    let mailSubject = "";
    let htmlBody = "";

    if (type === "order") {
      mailSubject = `🛒 Order Request: ${productName}`;
      htmlBody = `
        <h2>New Product Order</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Dosage:</strong> ${productDosage}</p>
        <p><strong>Pack:</strong> ${productPackSize}</p>
        <hr/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "career") {
      mailSubject = `🧑‍💼 Career Application: ${subject} - ${name}`;
      htmlBody = `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "contact") {
      mailSubject = `📩 Contact Message from ${name}`;
      htmlBody = `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    if (type === "medical") {
      mailSubject = `🩺 Medical Request from ${name}`;
      htmlBody = `
        <h2>Medical Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    await transporter.sendMail({
      from: `"My Body Healer" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: mailSubject,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true, message: "✅ Sent Successfully!" });
  } catch (error: any) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ success: false, message: "❌ Sending Failed" }, { status: 500 });
  }
}
