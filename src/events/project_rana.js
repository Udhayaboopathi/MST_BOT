const samp = require("samp-query");

const trackedPlayers = ["Rana_Dev"];
const serverOptions = {
  KDM: { host: "148.113.8.240", port: 1111 },
  IURP: { host: "15.235.141.203", port: 7777 },
  ACRP: { host: "15.235.209.107", port: 7788 },
};
const channelId = "1254368096093863987";
const checkInterval = 1000;
let previousPlayers = {
  KDM: new Set(),
  IURP: new Set(),
  ACRP: new Set(),
  Legendary_RP: new Set(),
};

async function checkServer(serverKey, client) {
  const options = serverOptions[serverKey];

  samp(options, (error, query) => {
    if (error) {
      return;
    }

    const currentPlayers = new Set(query.players.map((player) => player.name));

    trackedPlayers.forEach((trackedPlayer) => {
      const isTrackedPlayerOnline = currentPlayers.has(trackedPlayer);
      const wasTrackedPlayerOnline =
        previousPlayers[serverKey].has(trackedPlayer);

      if (isTrackedPlayerOnline && !wasTrackedPlayerOnline) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          channel.send(
            `**${trackedPlayer}** ஆடு மாட்டிக்கிச்சி வாங்கடா ${serverKey}-க்கு.`
          );
        }
      } else if (!isTrackedPlayerOnline && wasTrackedPlayerOnline) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          channel.send(`**${trackedPlayer}** தா*** ஓடிட்டான்டா .`);
        }
      }
    });

    previousPlayers[serverKey] = currentPlayers;
  });
}

function startPlayerTracking(client) {
  console.log("Finder is working ");
  Object.keys(serverOptions).forEach((serverKey) => {
    setInterval(() => checkServer(serverKey, client), checkInterval);
  });
}

module.exports = { startPlayerTracking };
