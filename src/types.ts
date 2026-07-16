import {ChatInputCommandInteraction, SlashCommandBuilder, Client} from "discord.js";

export interface ServerConfig {
    token: string;
    id: string;
}

export type Nested = { [key: string]: Nested | string | undefined } | string | undefined;

export interface BotConfig {
    [key: string]: Nested;
    texts?: {
        [key: string]: Nested,
        activity?: string
    };
}
export interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction, storage: Map<string, any>) => Promise<void>;
}
export interface Bot {
    intents: number[];
    init?: (client: Client) => Promise<void>;
    next: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
