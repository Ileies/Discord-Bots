import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {embed, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder().setName('elias').setDescription('sagt, dass Elias süss ist'),
	async execute(interaction, storage) {
		//interaction.reply("Elias ist süss");
		await reply(interaction, embed().setTitle("Commands").addFields(
			{name:"/elias",value:"Elias ist sehr süss",inline:true},
			{name:"Help & Support",value:"Ja, hier findest du Hilfe, wenn du Elias nicht süss findest:  " + storage.get("owner").tag, inline:true}
		).setFooter({text: "© 2023 - Made with ganz viel❤️ by " + storage.get("owner").tag}));
	}
} as Command;