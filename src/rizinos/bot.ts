import {Client, GatewayIntentBits} from 'discord.js';
import {Bot} from "../types";

export default {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	],
	init: (client) => {
		/*setInterval(()=> {api('listener', res=> {action(res);});}, 3000);
		client.on('message', message=> {
			var g = "";
			if(message.channel.type == "guild") {
				g = "&guild="+message.guild.id;
				if(message.author.hasPermission('ADMINISTRATOR')) g += "&admin=1";
			}
			api('cmd'+g+"&user="+message.author.id+"&command="+message.content+"&type="+message.channel.type+"&cid="+message.channel.id, res=> {action(res);}, err=> {message.reply(err)});
		});
		client.on('guildMemberAdd', user=> {
			api("mcc&guild="+user.guild, res=> {var channel;if(channel = user.guild.channels.cache.get(res)) channel.setName(user.guild.memberCount);});
		});
		client.on('guildMemberRemove', user=> {
			api("mcc&guild="+user.guild, res=> {var channel;if(channel = user.guild.channels.cache.get(res)) channel.setName(user.guild.memberCount);});
		});*/
	},
} as Bot;


/*
async function getUser(id) {return await client.users.fetch(id);}
async function getChannel(id) {return await client.channels.fetch(id);}
async function getGuild(id) {return await client.guilds.fetch(id);}
async function getMember(gid, id) {var guild = await getGuild(gid);return await guild.members.fetch(id);}
function dm(id, msg) {getUser(id).then(user=> {user.send(msg)});}
function action(data) {
	try{var x = JSON.parse(data);} catch(e) {console.log("[ERROR]: Website error: " + data.replace("\n", "\\n"));return;}
	if(x.error) {console.log("[ERROR]: " + x.error);return;}
	x.forEach(async e=> {switch(e.action) {
		case "presence":
			setPresence(e.status, e.activity);
			break;
		case "req":
			var name = "";
			switch(e.type) {
				case "member":
					var user = await getMember(e.guild, e.id);
					name = user.user.tag;
					break;
				case "user":
					var user = await getUser(e.id);
					name = user.tag;
					break;
				case "channel":
					var channel = await getChannel(e.id);
					if(channel.type == "text") name = channel.name;
					else name = channel.recipient.tag;
					break;
				case "guild":
					var guild = await getGuild(e.id);
					name = guild.name;
					break;
				case "roles":
					var user = await getMember(e.guild, e.id);
					name = JSON.stringify(user._roles);
					break;
				case "members":
					var guild = await getGuild(e.id);
					var members = await guild.members.fetch();
					var list = [];
					members.forEach(member=> {list.push(member.user.id);});
					name = JSON.stringify(list);
					break;
			}
			api('req&token='+e.token+'&data='+Buffer.from(name).toString('base64'));
			break;
		case "dm":
			dm(e.user, e.msg);
			break;
		case "send":
			var channel = await getChannel(e.channel);
			channel.send(e.msg);
			break;
		case "addrole":
			var user = await getMember(e.guild, e.user);
			user.roles.add(e.role);
			break;
		case "remrole":
			var user = await getMember(e.guild, e.user);
			user.roles.remove(e.role);
			break;
		case "warn":
			dm(config.owner, e.msg);
			break;
		case "delete":
			var channel = await getChannel(e.channel);
			channel.fetchMessage(e.msg).then(msg=> {msg.delete()});
			break;
		case "edit":
			var channel = await getChannel(e.channel);
			channel.fetchMessage(e.msg).then(msg=> {if(msg) msg.edit(e.text);});
			break;
	}});
}
*/