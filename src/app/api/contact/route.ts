import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// IMPORTANT: Set up these environment variables in your .env.local file.
// For testing with Gmail, you may need to create an "App Password"
// instead of using your regular password.
// See: https://support.google.com/accounts/answer/185833
const EMAIL_SERVER_USER = process.env.EMAIL_SERVER_USER;
const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const EMAIL_SERVER_PORT = process.env.EMAIL_SERVER_PORT;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO; // The address that receives the contact form submissions

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();

  if (!EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD || !EMAIL_SERVER_HOST || !EMAIL_TO || !EMAIL_FROM) {
    return NextResponse.json({ message: 'Server is not configured for sending emails.' }, { status: 500 });
  }

  // The `port` property can be a number or a string.
  // We need to ensure it's a number for the transporter config.
  const port = Number(EMAIL_SERVER_PORT) || 587;

  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email.' }, { status: 500 });
  }
} 