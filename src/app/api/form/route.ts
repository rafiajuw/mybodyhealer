// app/api/form/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    // Required env vars
    const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_TO"];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Missing env: ${envVar}`);
        return NextResponse.json(
          { success: false, message: "Server error." },
          { status: 500 }
        );
      }
    }

    const formData = await request.formData();
    const type = (formData.get("type") as string)?.trim()?.toLowerCase();

    // === VALIDATE FORM TYPE ===
    if (!type || !["order", "career", "contact", "medical"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid form type." },
        { status: 400 }
      );
    }

    // === COMMON FIELDS ===
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || "Not provided";
    const message = (formData.get("message") as string)?.trim() || "No message";

    // === ORDER-SPECIFIC FIELDS ===
    const productName = (formData.get("productName") as string)?.trim();
    const productDosage = (formData.get("productDosage") as string)?.trim();
    const productPackSize = (formData.get("productPackSize") as string)?.trim();

    // === CAREER-SPECIFIC ===
    const subject = (formData.get("subject") as string)?.trim() || "General";
    const file = formData.get("resume") as File | null;

    // === VALIDATION BY TYPE ===
    if (type === "order") {
      if (!productName || !name || !email || !phone) {
        return NextResponse.json(
          { success: false, message: "Product, name, email, and phone are required." },
          { status: 400 }
        );
      }
    } else {
      if (!name || !email) {
        return NextResponse.json(
          { success: false, message: "Name and email are required." },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email." },
        { status: 400 }
      );
    }

    // === FILE VALIDATION (Only for career) ===
    let attachments: any[] = [];
    if (type === "career" && file) {
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Resume must be PDF, DOC, or DOCX." },
          { status: 400 }
        );
      }
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "Resume must be under 10MB." },
          { status: 400 }
        );
      }
      attachments.push({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      });
    }

    // === SMTP SETUP ===
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
      connectionTimeout: 10000,
    });

    await transporter.verify();

    // === EMAIL TEMPLATES ===
    let mailSubject = "";
    let htmlBody = "";

    if (type === "order") {
      mailSubject = `New Order: ${productName} - ${name}`;
      htmlBody = `
        <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 12px;">
          <h2 style="color: #065f46; text-align: center;">New Product Order</h2>
          <div style="background: white; padding: 20px; border-radius: 10px;">
            <h3 style="color: #059669;">Product</h3>
            <p><strong>Name:</strong> ${productName}</p>
            <p><strong>Dosage:</strong> ${productDosage}</p>
            <p><strong>Pack:</strong> ${productPackSize}</p>
            <hr style="border: 1px dashed #ddd; margin: 15px 0;">
            <h3 style="color: #059669;">Customer</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="text-align: center; font-size: 12px; color: #666; margin-top: 20px;">
            My Body Healer Oncology Shop
          </p>
        </div>
      `;

    } else if (type === "career") {
      mailSubject = `Career: ${subject} - ${name}`;
      htmlBody = `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        ${file ? `<p><strong>Resume:</strong> ${file.name}</p>` : ""}
      `;

    } else if (type === "contact") {
      mailSubject = `Contact: ${subject} - ${name}`;
      htmlBody = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;

    } else if (type === "medical") {
      mailSubject = `Medical: ${subject} - ${name}`;
      htmlBody = `
        <h2>Medical Consultation</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `;
    }

    // === SEND EMAIL ===
    await transporter.sendMail({
      from: `"My Body Healer" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: mailSubject,
      html: htmlBody,
      attachments,
    });

    console.log(`Email sent: ${type} - ${name}`);
    return NextResponse.json({
      success: true,
      message: `${
        type === "order" ? "Order" : type.charAt(0).toUpperCase() + type.slice(1)
      } submitted!`,
    });

  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send. Try again." },
      { status: 500 }
    );
  }
}