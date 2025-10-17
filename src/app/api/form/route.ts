// app/api/form/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_TO"];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`❌ Missing environment variable: ${envVar}`);
        return NextResponse.json(
          { success: false, message: "❌ Server configuration error." },
          { status: 500 }
        );
      }
    }

    const formData = await request.formData();
    const type = (formData.get("type") as string)?.trim()?.toLowerCase();
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const subject = (formData.get("subject") as string)?.trim() || "General Inquiry";
    const message = (formData.get("message") as string)?.trim() || "No message provided";
    const phone = (formData.get("phone") as string)?.trim() || "Not provided";
    const file = formData.get("resume") as File | null;

    if (!type || !["career", "contact", "medical"].includes(type)) {
      console.error(`Invalid form type: ${type}`);
      return NextResponse.json(
        { success: false, message: "❌ Invalid form type." },
        { status: 400 }
      );
    }

    if (!name || !email) {
      console.error("Missing required fields", { name, email });
      return NextResponse.json(
        { success: false, message: "❌ Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error(`Invalid email format: ${email}`);
      return NextResponse.json(
        { success: false, message: "❌ Please enter a valid email address." },
        { status: 400 }
      );
    }

    let attachments: nodemailer.SendMailOptions["attachments"] = [];
    if (type === "career" && file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        console.error(`Invalid file type: ${file.type}`);
        return NextResponse.json(
          { success: false, message: "❌ Resume must be a PDF, DOC, or DOCX file." },
          { status: 400 }
        );
      }
      if (file.size > 10 * 1024 * 1024) {
        console.error(`File too large: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        return NextResponse.json(
          { success: false, message: "❌ Resume file size exceeds 10MB limit." },
          { status: 400 }
        );
      }
      attachments = [
        {
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type || "application/octet-stream",
        },
      ];
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "send.one.com",
      port: Number(process.env.MAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      logger: process.env.NODE_ENV === "development",
      debug: process.env.NODE_ENV === "development",
    });

    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const toEmail = process.env.MAIL_TO;
    let mailSubject = "";
    let htmlBody = "";

    switch (type) {
      case "career":
        mailSubject = `🧑‍💼 Career Application: ${subject} - ${name}`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6;">
            <h2 style="color: #059669; margin-bottom: 20px;">New Career Application</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #059669;">${email}</a></p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Position Applied:</strong> ${subject}</p>
              <p><strong>Cover Letter:</strong><br>${message}</p>
            </div>
            ${file ? `<p style="color: #059669;"><strong>📎 Resume:</strong> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</p>` : ""}
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">Applied via My Body Healer Careers Page on ${new Date().toLocaleDateString()}</p>
          </div>
        `;
        break;
      case "contact":
        mailSubject = `📩 Contact Form: ${subject} - ${name}`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6;">
            <h2 style="color: #059669; margin-bottom: 20px;">New Contact Message</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #059669;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong><br>${message}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Received on ${new Date().toLocaleDateString()}</p>
          </div>
        `;
        break;
      case "medical":
        mailSubject = `🩺 Medical Inquiry: ${subject} - ${name}`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6;">
            <h2 style="color: #059669; margin-bottom: 20px;">Medical Consultation Request</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #059669;">${email}</a></p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong><br>${message}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Medical inquiry received on ${new Date().toLocaleDateString()}</p>
          </div>
        `;
        break;
    }

    await transporter.sendMail({
      from: `"My Body Healer" <${process.env.MAIL_USER}>`,
      replyTo: email,
      to: toEmail,
      cc: process.env.MAIL_CC?.split(",").map((email) => email.trim()).filter(Boolean) || [],
      subject: mailSubject,
      html: htmlBody,
      attachments,
      headers: { "X-Mailer": "My Body Healer Contact Form" },
    });

    console.log(`✅ ${type} form email sent successfully from ${email} to ${toEmail}`);

    return NextResponse.json({
      success: true,
      message: `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} form submitted successfully!`,
    }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Mail Error Details:", {
      message: error.message,
      code: error.code,
      response: error.response?.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    let errorMessage = "❌ Failed to send email. Please try again later.";
    if (error.code === "EAUTH") errorMessage = "❌ Email authentication failed.";
    else if (error.code === "ECONNECTION") errorMessage = "❌ Connection error.";
    else if (error.message.includes("timeout")) errorMessage = "❌ Request timeout.";
    else if (error.message.includes("Invalid login")) errorMessage = "❌ Invalid email credentials.";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
      },
      { status: 500 }
    );
  }
}