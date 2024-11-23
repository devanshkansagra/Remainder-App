import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

export class RemindCommand implements ISlashCommand {
    public command = 'remainder';
    public i18nParamsExample = '';
    public i18nDescription = '';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp) : Promise <void> {
        const [parameters] = context.getArguments();

        switch(parameters) {
            case 'set': {
                await this.sendMessage(context, modify, 'set command');
                break;
            }
            case 'list' : {
                console.log('list is executed');
                break;
            }
            case 'delete': {
                console.log('delete is executed');
                break;
            }
        }
    }

    private async sendMessage(context: SlashCommandContext, modify: IModify, message: string): Promise<void> {
        const messageStructure = modify.getCreator().startMessage();
        const room = context.getRoom();
    
        messageStructure
            .setRoom(room)
            .setText(message);
    
        await modify.getCreator().finish(messageStructure);
    }
}