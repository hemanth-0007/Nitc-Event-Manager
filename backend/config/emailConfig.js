import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY,
});

const sentFrom = new Sender("", "Hemanth");

const recipients = [
  new Recipient("hsai19172@gmail.com", "Hemanth Sai")
];


const personalization = [
  {
    email: "your@client.com",
    data: {
      test: 'Test Value'
    },
  }
];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setPersonalization(personalization)
  .setSubject(`This is a Subject {{test}}`)
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content")
  .setTemplateId("pr9084z900xlw63d");


// const emailOTPParams = new EmailParams()
//   .setFrom(sentFrom)
//   .setTo(recipients)
//   .setReplyTo(sentFrom)
//   .setSubject("OTP Verification for Forgot Password Request")
//   .setHtml("<strong>OTP</strong>")
//   .setText("This is the text content")
//   .setTemplateId("pr9084z900xlw63d")
//   .setVariables({
//     name: "",
//     otp: "",
//   });

export const sendEmail = async () => {
    await mailerSend.email.send(emailParams);
    console.log("Email sent successfully");
}
 