const { EmbedBuilder } = require("discord.js");
const samp = require("samp-query");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("samp_status")
    .setDescription("Samp online Players Status")
    .addStringOption((option) =>
      option
        .setName("server")
        .setDescription("Select the server to query")
        .setRequired(true)
        .addChoices(
          { name: "kdm", value: "148.113.8.240:1111" },
          { name: "iurp", value: "15.235.141.203:7777" },
          { name: "acrp", value: "15.235.209.107:7788" }
        )
    ),
  run: async (client, interaction) => {
    const color = 0xff0000;

    const friends = [
      "Leo_Hawkins",
      "Jack_Martin",
      "Siva_Ram",
      "Abhi_Smoky",
      "Abhi_Ruzz",
      "Siva_Das",
      "Siva_Doss",
      "Siva_Dhas",
      "Daniel_Balaji",
      "Jod_Itachi",
      "Nerupu_Kumar",
      "Jod_Itachi ",
      "CK_OP",
      "Navaneetha_Krishnan",
      "Clark_Kent",
      "Leo_op",
      "Kolar_Karan",
      "Kolar_Karan1",
      "Sandy_Shaw",
    ];

    const serverOption = interaction.options.getString("server");
    const [host, port] = serverOption.split(":");

    const options = { host, port: parseInt(port) };

    // Wrap samp query in a promise to use it with await
    const queryServer = (options) => {
      return new Promise((resolve, reject) => {
        samp(options, (error, query) => {
          if (error) reject(error);
          else resolve(query);
        });
      });
    };

    try {
      const query = await queryServer(options);

      if (!query || !query.hostname) {
        return interaction.reply("Unable to retrieve server information.");
      }

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "OnlinePlayers",
          iconURL:
            "https://media.discordapp.net/attachments/973940779502424094/1077639272938606663/20230221_221608.png?width=655&height=468",
          url: "https://discord.gg/zNECMfFzjp",
        })
        .setImage(
          "https://media1.tenor.com/m/1DEj-XNoEO8AAAAC/gta-online-mmi.gif"
        )
        .setColor(color)
        .setTitle(`**${query.hostname}**`);

      if (query.online > 0) {
        let friendsTable = "ID | NICK\n---|----\n";
        let playersTable = "ID | NICK\n---|----\n";
        let playersTable2 = "",
          playersTable3 = "",
          playersTable4 = "",
          playersTable5 = "";

        if (query.online > 20) playersTable2 = "ID | NICK\n---|----\n";
        if (query.online > 40) playersTable3 = "ID | NICK\n---|----\n";
        if (query.online > 60) playersTable4 = "ID | NICK\n---|----\n";
        if (query.online > 80) playersTable5 = "ID | NICK\n---|----\n";

        query.players.forEach((player, i) => {
          const row = `${player.id} | ${player.name}\n`;
          const tableIndex = Math.floor(i / 20);

          if (friends.includes(player.name)) {
            friendsTable += row;
          } else {
            switch (tableIndex) {
              case 0:
                playersTable += row;
                break;
              case 1:
                playersTable2 += row;
                break;
              case 2:
                playersTable3 += row;
                break;
              case 3:
                playersTable4 += row;
                break;
              case 4:
                playersTable5 += row;
                break;
            }
          }
        });

        if (friendsTable.split("\n").length > 3) {
          embed.addFields({
            name: "MAESTROS MEMBERS",
            value: "```\n" + friendsTable + "```",
          });
        }

        embed.addFields({
          name: `${query.online}/${query.maxplayers}`,
          value: "```\n" + playersTable + "```",
        });
        if (query.online > 20)
          embed.addFields({
            name: "\u200B",
            value: "```\n" + playersTable2 + "```",
          });
        if (query.online > 40)
          embed.addFields({
            name: "\u200B",
            value: "```\n" + playersTable3 + "```",
          });
        if (query.online > 60)
          embed.addFields({
            name: "\u200B",
            value: "```\n" + playersTable4 + "```",
          });
        if (query.online > 80)
          embed.addFields({
            name: "\u200B",
            value: "```\n" + playersTable5 + "```",
          });
      } else {
        embed.addFields({ name: "PLAYERS LIST", value: "*Server is empty*" });
      }

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching server information:", error);
      return interaction.reply(
        "An error occurred while fetching server information."
      );
    }
  },
};
