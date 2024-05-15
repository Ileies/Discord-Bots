import {
	ChatInputCommandInteraction,
	Client,
	ColorResolvable,
	EmbedBuilder,
	Interaction,
	PermissionsBitField
} from 'discord.js';
import texts from './texts.json';
import servers from './servers.json';
import axios, {AxiosResponse} from 'axios';
import {Bot as BotType, Command, ServerConfig} from './types';
import {join} from "path";
import {existsSync} from "fs";

export class Bot implements BotType {
	storage: Map<string, any> = new Map();
	commands: Map<string, Command> = new Map();
	intents: number[];
	constructor(botData: BotType) {
		this.intents = botData.intents;
		if(botData.init) this.init = botData.init;
		if(botData.next) this.next = botData.next;
	}
	async init(client: Client) {}
	async next(interaction: Interaction) {}
}

function getServerConfig(error: Error, fileOnly = true): string|ServerConfig|null {
    const stack = (error.stack ?? "").split('\n');
    // Find calling file in a stack
    let callingFile: string|null = null;
    for (let i = 2; i < stack.length; i++) {
        const match = stack[i].match(/(\w+)\\(?:commands\\)?\w+\.js:/);
        if (match) {
            callingFile = match[1];
            break;
        }
    }
	if(!callingFile) return null;
    if(fileOnly) return callingFile;
	return servers[callingFile as keyof typeof servers];
}

// A useful utility for quickly creating a message
export const embed = () => new EmbedBuilder().setColor(0x5865F2);

// Checks if a user is an administrator
export async function admin(interaction: ChatInputCommandInteraction) {
	if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator)) {
		await reply(interaction, texts.needsAdmin);
		return false;
	}
	return true;
}

// Outputs an error message
export async function err(error: any, interaction: ChatInputCommandInteraction) {
	console.error(`[${getServerConfig(new Error())}]: `, error);
	await reply(interaction, texts.error, true, 0xED4245);
}

// Responds to a command with a nicely designed embedded message
export async function reply(interaction: ChatInputCommandInteraction, content: string|EmbedBuilder, ephemeral = true, color: ColorResolvable = 0x5865F2) {
	if (typeof content === "string") {
		content = new EmbedBuilder().setColor(color).setDescription(content);
	}
	await interaction.reply({ embeds: [content], ephemeral: ephemeral });
}

// Accesses the RizinOS API
export async function api(query: string, then = (data: AxiosResponse<any, any>) => {}, err = (err: any) => {}) {
	try {
		const data = await axios.get(texts.apiUrl + query);
		then(data);
	} catch (error) {
		console.error(error);
		err(error);
	}
}


