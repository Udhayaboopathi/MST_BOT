const { ActivityType, Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    // Set the bot's status to idle
    client.user.setStatus("idle");
    const guild = client.guilds.cache.first();
    const memberCount = guild ? guild.memberCount : "N/A";
    // Define activities
    let activities = [`${memberCount} MEMBERS`, `${client.user.username}`],
      i = 0;

    // Rotate activities every 10 seconds
    setInterval(() => {
      client.user.setActivity({
        name: `${activities[i++ % activities.length]}`,
        type: ActivityType.Listening,
      });
    }, 10000);

    console.log(`${client.user.tag} is now online with idle status!`);
  },
};
