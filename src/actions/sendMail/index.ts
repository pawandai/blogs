import { createSafeAction } from "@/lib/createSafeAction";
import { InputType, ReturnType } from "./types";
import nodemailer from "nodemailer";
import { SendMail } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, email, message, subscribe } = data;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    // Email message
    await transporter.sendMail({
      from: "delivered@resend.dev",
      to: "contactpawandai@gmail.com",
      subject: `New contact from ${name} (${email})`,
      text: `Message: ${message}\n\nSubscribe to Newsletter: ${
        subscribe ? "Yes" : "No"
      }`,
    });

    return { data: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to send the message. Please try again." };
  }
};

export const sendMail = createSafeAction(SendMail, handler);
