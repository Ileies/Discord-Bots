import {BaseGuildTextChannel, ChatInputCommandInteraction, Interaction, SlashCommandBuilder} from "discord.js";
import {admin, api, err, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Link a channel with your Minecraft Server')
		.addStringOption(option => option
			.setName("token")
			.setDescription("The Token of your Minecraft Server")
			.setRequired(true)
		),
	async execute(interaction, storage) {
		if(!await admin(interaction)) return;
		// Sendet eine Anfrage an meinen Server um das Token zu prüfen und meldet dem Nutzer dann, ob es funktioniert hat.
		// Erstellt außerdem einen Webhook, der Nachrichten mit verschiedenen Namen und Avataren senden kann.
		const channel = interaction.channel as BaseGuildTextChannel;
		await channel.createWebhook({name: "MineChat", avatar: "https://cdn.discordapp.com/avatars/901984521652690944/d4c177a29bf2835f3557310d46c13b7b.png", reason: "Fetching messages sent in your Minecraft Server"}).then(async webhook => await api("minechat.php?b&action=link&id="+webhook.id+"&token="+webhook.token+"&channel="+interaction.channel?.id+"&key="+interaction.options.getString('token'), data=> reply(interaction, [
			"This channel is now linked with your Minecraft server.",
			"This channel is already linked with another Minecraft Server. Use /quit to exit.",
			"This channel is already linked with that Minecraft Server. Use /quit to exit.",
			"You tried to use an invalid or expired token",
			"Something went wrong."
		][data.data]), e=>err(e, interaction))).catch(e=> {reply(interaction, "Webhook could not be created. Do I lack the permission?");console.log(e);});
	}
} as Command;