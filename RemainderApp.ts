import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { RemindCommand } from './src/commands/remainder';
import { ExecuteViewSubmitHandler } from './src/handlers/ExecuteViewSubmitHandler';
import { UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';

export class RemainderApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    public async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead,
    ): Promise<void> {
        configuration.slashCommands.provideSlashCommand(new RemindCommand(this));
    }

    public async executeViewSubmitHandler( 
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        modify: IModify,
        persistence: IPersistence) {
        const handler = new ExecuteViewSubmitHandler(this, context, modify, read, persistence);
        handler.run(context);
    }
}
