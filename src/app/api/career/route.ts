import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // transporter config (use your gmail & app password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your gmail
        pass: process.env.GMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: `"Career Form" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL, // your receiving email
      subject: "New Career Application - My Body Healer",
      html: `
        <h3>New Career Application</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
