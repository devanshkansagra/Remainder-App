import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { createRemainder } from "../modals/createRemainder";
import { RemainderApp } from "../../RemainderApp";

export class RemindCommand implements ISlashCommand {
    public command = "remainder";
    public i18nParamsExample = "";
    public i18nDescription = "";
    public providesPreview = false;
    public id: string = "";
    constructor(app: RemainderApp) {
        this.id = app.getID();
    }
    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
    ): Promise<void> {
        const [parameters] = context.getArguments();

        switch (parameters) {
            case "set": {
                new createRemainder(modify, context).createRemainderModal(
                    this.id,
                );
                break;
            }
            case "list": {
                console.log("list is executed");
                break;
            }
            case "delete": {
                console.log("delete is executed");
                break;
            }
        }
    }

    private async sendMessage(
        context: SlashCommandContext,
        modify: IModify,
        message: string,
    ): Promise<void> {
        const messageStructure = modify.getCreator().startMessage();
        const room = context.getRoom();

        messageStructure.setRoom(room).setText(message);

        await modify.getCreator().finish(messageStructure);
    }
}
