import { GatewayIntentBits } from "discord.js";
import {Bot} from "../types";

export default {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
} as Bot;

