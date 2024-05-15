import {readdirSync, existsSync} from 'fs';
import {join} from 'path';
import {REST, Routes, Client, Interaction, Snowflake} from 'discord.js';
import defaultTexts from './texts.json';
import servers from './servers.json';
import {Bot, err} from './library';
import {ServerConfig, BotConfig, Bot as BotType, Nested} from './types';

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Iterate through the servers in the config
for (const [name, serverConfig] of Object.entries(servers as Record<string, ServerConfig>)) {
    const botDir = join(__dirname, `./${name}`);
    (async () => {
        const texts: Nested = {...defaultTexts};

        const log = (data: any) => console.log(`[${name}]: `, data);

        // Check if the bot file exists for the current server
        if (!existsSync(`${botDir}/bot.js`)) {
            log("Could not start: bot.js does not exist");
            return;
        }

        const bot = new Bot((await import(`${botDir}/bot.js`)).default as BotType);

        // Check if 'intents' property is defined in the bot file
        if (typeof bot.intents === "undefined") {
            log("Could not start: Intents undefined");
            return;
        }

        // Initialize REST API
        const rest = new REST().setToken(serverConfig.token);
        const commandsPath = `${botDir}/commands`;
        if (existsSync(commandsPath)) {
            const commandsFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandsFiles) {
                const command = (await import(`${commandsPath}/${file}`)).default;
                bot.commands.set(command.data.name, command);
            }
        }

        // Register application commands with Discord API
        // It should be possible to leave it empty, but as it's not, I'll temporarily skip this then
        if (bot.commands.size > 0) {
            await rest.put(Routes.applicationCommands(serverConfig.id as Snowflake), {body: Array.from(bot.commands).map(command => command[1].data.toJSON())});
        }

        // Create a new Discord client
        const client = new Client({intents: bot.intents});

        // Event handler for when the bot is ready
        client.once("ready", async (client: Client) => {
            bot.storage.set("name", name);
            await client.application?.fetch();
            bot.storage.set("client", client);
            bot.storage.set("owner", await client.users.fetch(client.application?.owner?.id ?? ''));
            if (existsSync(`${botDir}/config.json`)) {
                const botConfig: BotConfig = (await import(`${botDir}/config.json`)).default;
                for (const key in botConfig) {
                    if (key === "texts")  {
                        for (const text in botConfig.texts) {
                            texts[text] = botConfig.texts[text];
                        }
                        continue;
                    }
                    bot.storage.set(key, botConfig[key]);
                }
            }
            bot.storage.set("texts", texts);

            try {
                await bot.init(client);
            } catch (error) {
                log("Bot couldn't start");
                await client.destroy();
                return;
            }

            client.user?.setPresence({status: "online", activities: [{name: texts.activity as string ?? ""}]});
            log(`Bot was started`);
        });

        // Event handler for when an interaction is created (e.g., a command is used)
        client.on("interactionCreate", async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = bot.commands.get(interaction.commandName);

            if (!command) {
                log(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction, bot.storage);
            } catch (error) {
                await err(error, interaction);
            }

            await bot.next(interaction);
        });

        // Log in to Discord
        await client.login(serverConfig.token);
    })();
}

/* Maybe catch all:

catch (error) {
    console.error(`[${name}]: `, error);
    if (client) client.destroy();
}

 */