import {SlashCommandBuilder} from "discord.js";
import {admin, api, err, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder()
		.setName('prefix')
		.setDescription('Set a prefix to the messages sent in Minecraft')
		.addStringOption(option => option
			.setName("prefix")
			.setDescription("The prefix to show in your Minecraft Server")
			.setRequired(true)
		),
	async execute(interaction, storage) {
		if(!await admin(interaction)) return;
		// Sendet ein neues Prefix an meinen Server, dass dann im Minecraft-Server verwendet wird.
		await api("minechat?b&action=prefix&prefix=" + encodeURIComponent(interaction.options.getString('prefix') ?? "") + "&channel=" + interaction.channel?.id, data => {
			if (data.data === 0) reply(interaction, "New prefix was set.");
			else reply(interaction, "Couldn't set new prefix.");
		}, e => err(e, interaction));
	}
} as Command;