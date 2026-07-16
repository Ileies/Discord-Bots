import { GatewayIntentBits } from "discord.js";
import type {Bot} from "../types";

export default {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	]
} as Bot;
