const { EmbedBuilder } = require("@discordjs/builders");
const { Client, Guild } = require("discord.js");

const { GuildMember, Embed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const { user, guild } = member;
    const welcomeChannel = member.guild.channels.cache.get(
      "1227682504257830942"
    );
    const welcomeMessage = `welcome <@${member.id}> to the channel`;
    const welcomeEmbed = new EmbedBuilder()
      .setAuthor({
        name: "Welcome",
        iconURL: guild.iconURL({ dynamic: true }),
        url: `https://discord.gg/2KcpeUKkGU`,
      })
      .setImage(
        "https://media1.tenor.com/m/6wzqcWGfih4AAAAC/discord-welcome.gif"
      )
      .setTitle(`${guild}`) // Set the title of the embed
      .setDescription(
        ` 𝐇𝐞𝐲,${member} 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 ${guild} 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐒𝐞𝐫𝐯𝐞𝐫!

          𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐚𝐝 𝐚𝐧𝐝 𝐟𝐨𝐥𝐥𝐨𝐰 <#1228284058035949674>
                    
          𝐃𝐎 𝐍𝐎𝐓 𝐬𝐩𝐚𝐦 𝐥𝐢𝐧𝐤𝐬 𝐢𝐧 𝐞𝐯𝐞𝐫𝐲 𝐜𝐡𝐚𝐧𝐧𝐞𝐥 𝐚𝐧𝐝 𝐃𝐎 𝐍𝐎𝐓 𝐚𝐬𝐤 𝐭𝐡𝐞𝐦 𝐭𝐨 𝐬𝐮𝐛𝐬𝐜𝐫𝐢𝐛𝐞 𝐲𝐨𝐮𝐫 𝐜𝐡𝐚𝐧𝐧𝐞𝐥  I𝐈𝐥 𝐰𝐢𝐥𝐥 𝐤𝐢𝐜𝐤 𝐲𝐨𝐮
                    
          𝐈𝐟 𝐲𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐧𝐲 𝐡𝐞𝐥𝐩 <#1229343172996632576> 𝐓𝐚𝐠 <@&1228309637493952586>

          𝐈𝐟 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐣𝐨𝐢𝐧 𝐨𝐮𝐫 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲. 𝐏𝐥𝐬 𝐂𝐡𝐞𝐜𝐤 𝐓𝐡𝐢𝐬 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 <#1231989674642247800>

          𝐘𝐨𝐮 𝐚𝐫𝐞 𝐭𝐡𝐞 ${guild.memberCount} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐒𝐞𝐫𝐯𝐞𝐫`
      )
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter({
        text: `${guild}`,
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL()); // Set the thumbnail to the user's avatar

    welcomeChannel.send({ embeds: [welcomeEmbed] });
  },
};
