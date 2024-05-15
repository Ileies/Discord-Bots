import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {embed, reply} from "../../library";
import {Command} from "../../types";

export default {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows help info and commands.'),
	async execute(interaction, storage) {
		// Antwortet mit einer eingebetteten Nachricht, die eine Übersicht über die Befehle des Bots enthält
		await reply(interaction, embed().setTitle("MineChat Commands").addFields(
			{name:"/link <TOKEN>",value:"The core of MineChat: The channel in which this command is executed is assigned to the Minecraft server which you've got the `TOKEN` from. [More](https://ileies.de/MineChat/#link)",inline:true},
			{name:"/quit",value:"If this command is used on a channel connected to MineChat, the channel will be disconnected from MineChat. [More](https://rizinos.com/MineChat/#quit)",inline:true},
			{name:"/token <TOKEN>",value:"With this command you can link your Discord account with your Minecraft account, using a token which you get in-game by using `/token`. [More](https://rizinos.com/MineChat/#token)",inline:true},
			//{name:"/prefix <FORMAT>",value:". [More](https://rizinos.com/MineChat/#prefix)",inline:true},
			{name:"Help & Support",value:"If you encounter a problem or find a bug, feel free to contact me: __admin@ileies.de__\n[Add MineChat to your server](https://discord.com/oauth2/authorize?client_id=901984521652690944&permissions=2684365824&scope=bot) \n[Documentation](https://rizinos.com/MineChat/) \n[Download Plugin](https://rizinos.com/minechat/MineChat-2.0.0.jar)",inline:true}
		).setFooter({text: "© 2021-2022 - Made with ❤️ by " + storage.get("owner").tag}));
	}
} as Command;