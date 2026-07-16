import {SlashCommandBuilder, ColorResolvable} from "discord.js";
import {admin, embed, reply} from "../../library";
import {Command} from "../../types";

export default {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Sends a custom message')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Text to say')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('title')
            .setDescription('Add Custom Title')
        )
        .addStringOption(option => option
            .setName('color')
            .setDescription('Custom Color')
        ),
    async execute(interaction, storage) {
        if (!await admin(interaction)) return;
        // Add title option
        await reply(interaction, embed()
            .setTitle(interaction.options.getString('title'))
            .setDescription(interaction.options.getString('text') as string)
            .setColor(/^#?[\da-f]{6}$/i
                .test(interaction.options.getString('color') as string)
                ? interaction.options.getString('color') as ColorResolvable
                : "#5865F2"
            ), false
        );

    }
} as Command;