const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
} = require("discord.js");
const Discord = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
});
const config = require("./src/config.js");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const app = express();
const PORT = process.env.PORT || 3000;

let token = config.token;

client.commands = new Collection();
client.slashcommands = new Collection();
client.commandaliases = new Collection();

const rest = new REST({ version: "10" }).setToken(token);

const log = (x) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`);
};

//Express Form
const CHANNEL_ID = "1228319861529247796";

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Route to serve the form
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", async (req, res) => {
  const { name, message } = req.body;

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send(`**Name:** ${name}\n**Message:** ${message}`);
    res
      .status(200)
      .json({ success: true, message: "Message sent to Discord!" });
  } catch (error) {
    console.error("Error sending message to Discord:", error);
    res
      .status(500)
      .json({ success: false, message: "Error sending message to Discord" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//command-handler
const commands = [];
readdirSync("./src/commands/normal").forEach(async (file) => {
  const command = await require(`./src/commands/normal/${file}`);
  if (command) {
    client.commands.set(command.name, command);
    commands.push(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach((alias) => {
        client.commandaliases.set(alias, command.name);
      });
    }
  }
});

//slash-command-handler
const slashcommands = [];
readdirSync("./src/commands/slash").forEach(async (file) => {
  const command = await require(`./src/commands/slash/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
});

client.on(Events.ClientReady, async () => {
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: slashcommands,
    });
    const user = client.users.cache.get("581142001739628565");

    if (user) {
      await user.send("I am ready!");
    } else {
      console.error("User not found.");
    }
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username} is now Ready!`);
});

//event-handler
readdirSync("./src/events").forEach(async (file) => {
  const event = await require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

const { startPlayerTracking } = require("./src/events/samp_test.js");

startPlayerTracking(client);

//nodejs-listeners
process.on("unhandledRejection", (e) => {
  console.log(e);
});
process.on("uncaughtException", (e) => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log(e);
});

// keep_alive();

client.login(token);
