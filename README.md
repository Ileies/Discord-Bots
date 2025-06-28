# Discord Bots

A powerful Discord bot framework with a flexible abstraction layer, making it incredibly easy to create and deploy multiple bots from a single codebase.

## Overview

This repository showcases a sophisticated architecture for Discord bot development that emphasizes:

- **Unified Framework**: A shared abstraction layer that handles common bot functionality
- **Modular Design**: Clean separation between bot-specific logic and core infrastructure
- **Extensibility**: Simple process for adding new bots with minimal boilerplate code
- **Scalability**: Run multiple bots from a single codebase with independent configurations

The power of this framework lies in its abstraction layer, which automatically handles bot initialization, command registration, event handling, and more. This allows developers to focus solely on implementing bot-specific features without worrying about the underlying infrastructure.

## Architecture

### Core Framework Features

- **Automatic Bot Loading**: The system dynamically loads bots from their directories
- **Command Registration**: Slash commands are automatically registered with Discord API
- **Event Handling**: Common events are managed by the framework
- **Shared Utilities**: Common functionality available to all bots
- **Type Safety**: TypeScript interfaces ensure consistency across implementations

### Implemented Bots

The repository includes several bots that demonstrate the framework's capabilities:

- **MineChat**: A bridge between Discord and Minecraft chat
- **SkyShelf**: Forwards Traveling Spirit announcements for Sky: Children of the Light
- **Paimon**, **Cleli**, **Rizinos**, **Vanessa**: Additional bots in various stages of development

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Discord-Bots.git
   cd Discord-Bots
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure the bots (see Configuration section)

4. Build the project:
   ```bash
   bun run build
   ```

5. Start the bots:
   ```bash
   bun run start
   ```

## Configuration

### Server Configuration

Create or modify `src/servers.json` with your bot tokens and IDs:

```json
{
  "botname": {
    "id": "YOUR_BOT_ID",
    "token": "YOUR_BOT_TOKEN"
  }
}
```

Replace `botname` with the name of your bot directory (e.g., "minechat", "skyshelter").

### Bot-Specific Configuration

Some bots may require additional configuration in their respective directories. Check each bot's directory for a `config.json` file.

### Environment Variables

For better security, consider using environment variables for sensitive information like bot tokens instead of hardcoding them in the configuration files.

## Project Structure

```
Discord-Bots/
├── src/
│   ├── cleli/           # Cleli bot
│   ├── minechat/        # MineChat bot
│   │   ├── bot.ts       # Bot initialization
│   │   └── commands/    # Bot commands
│   ├── paimon/          # Paimon bot
│   ├── rizinos/         # Rizinos bot
│   ├── skyshelter/      # SkyShelf bot
│   │   ├── bot.ts       # Bot initialization
│   │   └── commands/    # Bot commands
│   ├── vanessa/         # Vanessa bot
│   ├── index.ts         # Main entry point
│   ├── library.ts       # Shared utilities
│   ├── servers.json     # Server configuration
│   ├── texts.json       # Default text messages
│   └── types.ts         # TypeScript type definitions
├── package.json
└── tsconfig.json
```

## Development

### The Power of Abstraction

The true strength of this project is how quickly you can create new bots:

1. **Minimal Boilerplate**: Create a new bot with just a few lines of code
2. **Automatic Registration**: Commands are automatically discovered and registered
3. **Shared Infrastructure**: Leverage existing utilities and error handling
4. **Independent Configuration**: Each bot maintains its own settings

### Adding a New Bot

Thanks to the abstraction layer, adding a new bot is remarkably simple:

1. Create a new directory in `src/` with your bot's name
2. Create a `bot.ts` file that implements the `Bot` interface:
   ```typescript
   import { GatewayIntentBits } from "discord.js";
   import { Bot } from "../types";

   export default {
     intents: [
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMessages
     ],
     init: async (client) => {
       // Your bot initialization code here
     },
     next: async (interaction) => {
       // Optional post-command execution logic
     }
   } as Bot;
   ```
3. Add your bot's configuration to `src/servers.json`
4. Create a `commands` directory and add your bot's commands

### Adding Commands

Commands are automatically discovered and registered with Discord:

1. Create a new TypeScript file in your bot's `commands` directory
2. Implement the `Command` interface:
   ```typescript
   import { SlashCommandBuilder } from "discord.js";
   import { Command } from "../../types";

   export default {
     data: new SlashCommandBuilder()
       .setName('command-name')
       .setDescription('Command description'),
     async execute(interaction, storage) {
       // Your command logic here
     }
   } as Command;
   ```
3. Export the command as default - the framework handles the rest!
