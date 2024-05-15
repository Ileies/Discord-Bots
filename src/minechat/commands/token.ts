import {SlashCommandBuilder} from "discord.js";
import {admin, api, err, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder()
		.setName('token')
		.setDescription('Link your Discord account with your Minecraft Account')
		.addStringOption(option => option
			.setName("token")
			.setDescription("The Token you've got in a Minecraft Server")
			.setRequired(true)
		),
	async execute(interaction, storage) {
		// Sendet eine Anfrage an meinen Server um das Token zu prüfen und meldet dem Nutzer dann, ob es funktioniert hat.
		await api("minechat.php?b&action=token&user="+interaction.user.id+"&token="+interaction.options.getString('token'), res=> reply(interaction, (res.data === 1 ? "Your Discord account is already linked with a Minecraft account" : res.data === 2 ? "You tried to use an invalid or expired token" : res.data === 3 ? "Something went wrong." : "Your Discord account is now linked with the Minecraft account **"+res+"**")), e=>err(e, interaction));
	}
} as Command;