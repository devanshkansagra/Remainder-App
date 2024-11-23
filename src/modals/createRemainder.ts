import {
    IModify,
    IRead,
    IUIKitSurfaceViewParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { UIKitSurfaceType } from "@rocket.chat/apps-engine/definition/uikit";

export class createRemainder {
    constructor(
        private readonly modify: IModify,
        private readonly slashCommandContext: SlashCommandContext,
    ) {}

    public async createRemainderModal(
        id: string,
    ): Promise<IUIKitSurfaceViewParam> {
        const modal: IUIKitSurfaceViewParam = {
            id: "set",
            type: UIKitSurfaceType.MODAL,
            title: {
                text: "Create Remainder",
                type: "plain_text",
            },
            blocks: [
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Remind at:",
                    },
                    element: {
                        type: "time_picker",
                        actionId: "action_remaind_at",
                        appId: id,
                        blockId: "block_remaind_at",
                    },
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Remainder title",
                    },
                    element: {
                        type: "plain_text_input",
                        appId: id,
                        actionId: "action_remainder_title",
                        blockId: "block_remainder_title",
                        placeholder: {
                            type: "plain_text",
                            text: "Message",
                        },
                        multiline: false,
                    },
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Remainder Message",
                    },
                    element: {
                        type: "plain_text_input",
                        appId: id,
                        actionId: "action_remainder_message",
                        blockId: "block_remainder_message",
                        placeholder: {
                            type: "plain_text",
                            text: "Message",
                        },
                        multiline: true,
                    },
                },
            ],
            submit: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Submit",
                },
                appId: id,
                blockId: "submit_block",
                actionId: "submit_action",
            },
            close: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Cancel",
                },
                appId: id,
                blockId: "cancel_block",
                actionId: "cancel_action",
            },
        };

        await this.modify
            .getUiController()
            .openSurfaceView(
                modal,
                { triggerId: this.slashCommandContext.getTriggerId()! },
                this.slashCommandContext.getSender(),
            );

        return modal;
    }
}
