import {SlashCommandBuilder} from "discord.js";
import {admin, api, err, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder()
		.setName('quit')
		.setDescription('Unlink a channel from your Minecraft Server'),
	async execute(interaction) {
		if(!await admin(interaction)) return;
		// Beendet die Verknüpfung zu einem Minecraft-Server durch eine Anfrage an meine Website und entfernt den zuvor erstellten Webhook.
		await api("minechat?b&action=quit&channel="+interaction.channel?.id, data=> {
			if(data) interaction.client.fetchWebhook(data.data.id, data.data.token).then(async webhook => {
				await webhook.delete();
				await reply(interaction, "This channel is no longer linked to a server.");
			}).catch(e=> reply(interaction, "Webhook could not be removed. Please remove it manually."));
			else reply(interaction, "This channel is not linked with any server");
		}, error=>err(error, interaction));
	}
} as Command;