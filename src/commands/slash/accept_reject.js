const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  PermissionsBitField,
  ClientVoiceManager,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("visa")
    .setDescription("visa command")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
        .addChoices(
          { name: "Accept", value: "accept" },
          { name: "Reject", value: "reject" },
        ),
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select the member")
        .setRequired(true),
    ),
  run: async (client, interaction) => {
    const memberMention = interaction.options.getUser("member").id;
    const memberMentions = interaction.options.getUser("member");
    const acceptedby = interaction.user.id;
    const avatarURL = memberMentions.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 256,
    });
    const guild = interaction.guild;
    const guildAvatarURL = guild.iconURL({
      format: "png",
      dynamic: true,
      size: 256,
    });
    const category = interaction.options.getString("category");
    //change roleId = your admin role or this command asses role
    const roleId = ["975416698339471360"];
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const roles = member.roles.cache.map((role) => role.id);
    if (!roleId.every((id) => roles.includes(id))) {
      return interaction.reply(
        "Role illa Thambi <@&975416698339471360> Mattum Tha indha command use panna mudium ",
      );
    }
    // replace the channel id
    if (category === "accept") {
      const accepted =
        interaction.guild.channels.cache.get("973940782862061588");

      const embed = new EmbedBuilder()

        .setAuthor({
          name: "Bikers Gang",
          iconURL: guildAvatarURL,
        })
        .setTitle("New Member Accepted")
        .setURL("https://discord.gg/2KcpeUKkGU")
        .setColor(0x008000)
        .addFields(
          {
            name: "New Member",
            value: `<@${memberMention}>`,
            inline: true,
          },
          {
            name: "Accepted By",
            value: `<@${acceptedby}>`,
          },
          {
            name: "Must Readable ",
            value: "<#973940778214764584>,<#1043941717272973423>",
          },
          {
            name: "Welcome to our Gang",
            value: `Hey machi <@${memberMention}>! Welcome to our gang! Super excited to have you on board. Get ready for some crazy times and solid bonding. Let's rock it together! 🤘😎`,
          },
        )
        .setThumbnail(avatarURL);
      await accepted.send({
        content: `<@${memberMention}>`,
        embeds: [embed],
      });
      await interaction.reply("Announce send");
    }
    if (category === "reject") {
      const reject = interaction.guild.channels.cache.get(
        "1043937348745965638",
      );

      const embed = new EmbedBuilder()

        .setAuthor({
          name: "Bikers Gang",
          iconURL: guildAvatarURL,
        })
        .setTitle("Rejected Application")
        .setURL("https://discord.gg/2KcpeUKkGU")
        .setColor(0xff0000)
        .addFields(
          {
            name: "Member",
            value: `<@${memberMention}>`,
            inline: true,
          },
          {
            name: "Rejected by",
            value: `<@${acceptedby}>`,
          },
          {
            name: "Sorry to say This",
            value: `<@${memberMention}> Your Application has been Rejected for some Reason.if You want to know the Reason Pls Contact <@&975416698339471360> `,
          },
        )
        .setThumbnail(avatarURL);
      await reject.send({
        content: `<@${memberMention}>`,
        embeds: [embed],
      });
      await interaction.reply("Announce send");
    }
  },
};
