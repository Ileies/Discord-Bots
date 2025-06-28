import {GatewayIntentBits} from "discord.js";
import {api} from "../library";
import {Bot} from "../types";

let channels: string[] = [];

export default {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    init: async (client) => {
        await api("minechat?b&action=list", data => channels = data.data);
        client.on("messageCreate", async message => {
            if (message.author.bot || !channels.includes(message.channel.id)) return;
            await message.delete();
            await api("minechat?b&action=msg&msg=" + encodeURIComponent(message.content) + "&channel=" + message.channel.id + "&user=" + message.author.id, data => {
                switch (data.data) {
                    case 0:
                        break;
                    case 1:
                        message.channel.send("Message could not be sent.");
                        break;
                    case 2:
                        message.channel.send("Before you can send messages in this channel, you have to link your Discord account to a Minecraft account. Use `/token`.");
                        break;
                    default:
                        message.channel.send("There was an error trying to connect to the MineChat API");
                }
            }, () => message.channel.send("There was an error trying to connect to the MineChat API"));
        });
    },
    next: async (interaction) => {
        if (interaction.commandName === "link" || interaction.commandName === "quit") await api("minechat.php?b&action=list", data => channels = data.data);
    }
} as Bot;
