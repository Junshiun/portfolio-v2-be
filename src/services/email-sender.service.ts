import nodemailer from 'nodemailer';
import 'dotenv/config';
import { TEmailProps } from '@models/email';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: process.env.ENV_AWS_REGION,
});

export const EmailSenderService = async (props: TEmailProps) => {

  let privateEmail: string;
  let privatePwd: string;

  try {

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: process.env.ENV_AWS_SECRET_MANAGER
      })
    );

    const object = JSON.parse(response.SecretString);

    privateEmail = object.EMAIL;
    privatePwd = object.EMAIL_KEY;

    const { email, subject, message } = props;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: privateEmail,
        pass: privatePwd
      }
    });

    const mailOptions = {
      from: privateEmail,
      to: privateEmail,
      subject: '(Portfolio-V2) From: ' + email + " " + subject,
      text: message
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(err, info){
        if (err) {
          reject(err.message);
        } else {
          console.log('Email sent: ' + info.response);
          resolve('Email sent');
        }
      });
    });

  } catch (err) {
    console.error(err);

    throw new Error(err.message);
  }
}