import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
// const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    // const { name, email, message } = await request.json();

    // if (!name || !email || !message) {
    //   return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    // }

    // await resend.emails.send({
    //   from: "verified-sender@yourdomain.com", // Replace with your verified sender email
    //   to: "marco.c@solutionai.ca",
    //   subject: `Nouveau message de contact de ${name}`,
    //   html: `<p><strong>Nom:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Message:</strong><br>${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
