import {GatewayIntentBits} from "discord.js";
import {Bot} from "../types";

export default {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	],
	init: (client) => {
		client.on("messageCreate", async message => {
			if(message.channel.id !== "1115671994931876001" || !message.content.includes("A Traveling Spirit arrives in Home on Thursday! Can you guess who is visiting?") || !message.attachments.size) return;
			const tsChannel = message.guild?.channels.cache.get("1114705870127894578");
			if (!tsChannel || !tsChannel.isTextBased()) return;
			await tsChannel.send({
				files: [...message.attachments.values()],
				content: "<@&1115684258145632308>"
			});
		});
	},
} as Bot;
