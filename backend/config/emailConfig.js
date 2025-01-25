import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY,
});

// const sentFrom = new Sender("796.mlsender.net", "Hemanth");

const recipients = [
  new Recipient("hsai19172@gmail.com", "Hemanth Sai")
];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content")
  .setTemplateId("pr9084z900xlw63d");

export const sendEmail = async () => {
    await mailerSend.email.send(emailParams);
    console.log("Email sent successfully");
}
