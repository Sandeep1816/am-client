import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, productTitle } = await req.json();

    if (!name || !email || !phone || !message || !productTitle) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert admin emails to array
    const adminEmails = process.env.ADMIN_EMAIL?.split(",").map((e) => e.trim()) || [];

    // -----------------------------
    // Email to Admin / Company
    // -----------------------------
    await sendMail(
      adminEmails, // <-- now accepts string[]
      `New Order Request — ${productTitle}`,
      `
        <h2>New Order Received</h2>
        <p><strong>Product:</strong> ${productTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    );

    // -----------------------------
    // Thank-you email to User
    // -----------------------------
    await sendMail(
      email, // string
      "Thank you for your order!",
      `
        <h2>Hi ${name},</h2>
        <p>Thanks for your interest in <strong>${productTitle}</strong>.</p>
        <p>We will contact you shortly.</p>
        <p>Regards,<br/>GIF Store</p>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
