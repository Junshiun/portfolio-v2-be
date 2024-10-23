import { TApiRequestProps } from "@models/api-request";
import { EmailSenderService } from "@services/email-sender.service";

export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
}

export const EmailSenderController = async (props: TApiRequestProps) => {

    try {
        const { body } = props;

        if (!body.email || !body.message || !body.subject) {
            return {
                errorCode: 400,
                message: "missing field email | message | subject"
            }
        }

        await EmailSenderService({
            email: props.body.email as string,
            message: props.body.message as string,
            subject: props.body.subject as string
        });

        return {
            statusCode: 200,
            body: {
                status: 'success',
                data: {},
                message: 'Message sent successfully',
            }
        }
    } catch(err) {
        return {
            errorCode: 400,
            message: err.message
        }
    }
}