const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { statusBedrock } = require("minecraft-server-util");

const SERVER_IP = "13.233.158.192";
const UDP_PORT = 19132;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcstatus")
    .setDescription("Check the status of the Minecraft Bedrock server"),
  run: async (client, interaction) => {
    await interaction.deferReply();

    try {
      console.log(`Checking status for server: ${SERVER_IP}:${UDP_PORT} (UDP)`); // Debug log

      const response = await statusBedrock(SERVER_IP, UDP_PORT);

      const version = response.version?.name || "Unknown";
      const onlinePlayers = response.players?.online || 0;
      const maxPlayers = response.players?.max || 0;
      const gameMode = response.gameMode || "Unknown";
      const serverIP = SERVER_IP;
      const serverPort = UDP_PORT;

      const statusEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setImage(
          "https://media1.tenor.com/m/DF_dLHDTw9AAAAAC/stupid-steve.gif"
        )
        .setTitle("MAESTROS COMMUNITY MINECRAFT")

        .addFields(
          {
            name: "Server IP",
            value: `${serverIP}`,
            inline: true,
          },
          {
            name: "Server Port",
            value: `${serverPort}`,
            inline: true,
          },
          { name: "Server Version", value: version, inline: true },
          { name: "Game Mode", value: gameMode, inline: true },
          {
            name: "Players Online",
            value: `${onlinePlayers}/${maxPlayers}`,
            inline: true,
          }
        )
        .setTimestamp();

      interaction.editReply({ embeds: [statusEmbed] });
    } catch (error) {
      console.error("Error fetching server status:", error);
      interaction.editReply(
        "Failed to fetch the server status. Please check the server and try again."
      );
    }
  },
};
