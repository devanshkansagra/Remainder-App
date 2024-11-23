import {
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { RemainderApp } from "../../RemainderApp";
import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class ExecuteViewSubmitHandler {
    constructor(
        private readonly app: RemainderApp,
        private readonly context: UIKitViewSubmitInteractionContext,
        private readonly modify: IModify,
        private readonly read: IRead,
        private readonly persis: IPersistence,
    ) {}
    public async run(context: UIKitViewSubmitInteractionContext) {
        const { view, user } = context.getInteractionData();
        const {
            block_remaind_at,
            block_remainder_message,
            block_remainder_title,
        } = view.state as {
            block_remaind_at;
            block_remainder_message;
            block_remainder_title;
        };
        let time = block_remaind_at.action_remaind_at;
        let title = block_remainder_title.action_remainder_title;
        let message = block_remainder_message.action_remainder_message;
        this.scheduleRemainder(user, time, title, message);
        this.context.getInteractionResponder().successResponse().success;
    }

    public async scheduleRemainder(
        user: IUser,
        time: any,
        title: string,
        description: string,
    ) {
        const currentDate = new Date();
        const dateString = currentDate.toISOString().split("T")[0];
        const dateTimeString = `${dateString}T${time}:00`;
        const scheduledTime = new Date(dateTimeString).getTime();
        const currentTime = new Date().getTime();
        const difference = scheduledTime - currentTime;

        if (difference > 0) {
            setTimeout(() => {
                console.log(
                    "New Remainder: \n Title: " +
                        title +
                        "\n" +
                        "Description: " +
                        description,
                );
            }, difference);
        } else {
            console.log("Past time");
        }
    }
}
