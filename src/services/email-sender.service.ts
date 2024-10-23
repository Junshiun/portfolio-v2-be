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

  let secretEmail: string;
  let secretPwd: string;

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: process.env.ENV_AWS_SECRET_MANAGER
      })
    );

    const object = JSON.parse(response.SecretString);

    secretEmail = object.EMAIL;
    secretPwd = object.EMAIL_KEY;
  } catch (err) {
    console.error(err);

    throw new Error(err.message);
  }

  const { email, subject, message } = props;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: secretEmail,
      pass: secretPwd
    }
  });

  const mailOptions = {
    from: secretEmail,
    to: secretEmail,
    subject: '(Portfolio-V2) From: ' + email + " " + subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      throw new Error(err.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}