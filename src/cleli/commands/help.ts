import {SlashCommandBuilder} from "discord.js";
import {embed, reply} from "../../library";
import {Command} from "../../types";

export default {
    data: new SlashCommandBuilder().setName('help').setDescription('Shows help info and commands.'),
    async execute(interaction, storage) {
        // Antwortet mit einer eingebetteten Nachricht, die eine Übersicht über die Befehle des Bots enthält
        await reply(interaction, embed().setTitle("Commands").addFields(
            {name: "/help", value: "Hi", inline: true},
            {name: "/say", value: "Send a custom message", inline: true},
            {
                name: "Help & Support",
                value: "If you encounter a problem or find a bug, feel free to contact me: " + storage.get("owner").tag,
                inline: true
            }
        ).setFooter({text: "© 2024 - Made with ❤️ by " + storage.get("owner").tag}));
    }
} as Command;
