import { EmailSenderController } from "@controllers/email-sender.controller";
import { TApiRequestProps } from "@models/api-request";
import DefaultFunc from "src/utils/defaultFunctions";

export const EmailSender = async (props: TApiRequestProps) => {

    try {
        const res = await EmailSenderController(props);

        return res
    } catch(err) {
        return DefaultFunc.JsonParse(err.message)
    }
}