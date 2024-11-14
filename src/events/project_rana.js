const samp = require("samp-query");

const trackedPlayers = ["Rana_Dev"];
const serverOptions = {
  KDM: { host: "148.113.8.240", port: 1111 },
  IURP: { host: "51.79.144.255", port: 7777 },
  ACRP: { host: "103.214.23.55", port: 7788 },
  Legendary_RP: { host: "103.214.23.55", port: 7782 },
};
const channelId = "1254368096093863987"; // Replace with your channel ID
const checkInterval = 1000; // Check every minute (in milliseconds)
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
      // console.error(`Error querying ${serverKey}: ${error}`);
      return;
    }

    const currentPlayers = new Set(query.players.map((player) => player.name));

    trackedPlayers.forEach((trackedPlayer) => {
      const isTrackedPlayerOnline = currentPlayers.has(trackedPlayer);
      const wasTrackedPlayerOnline =
        previousPlayers[serverKey].has(trackedPlayer);

      if (isTrackedPlayerOnline && !wasTrackedPlayerOnline) {
        // Player has come online
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          channel.send(
            `**${trackedPlayer}** ஆடு மாட்டிக்கிச்சி வாங்கடா ${serverKey}-க்கு.`
          );
        }
      } else if (!isTrackedPlayerOnline && wasTrackedPlayerOnline) {
        // Player has gone offline
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          channel.send(`**${trackedPlayer}** தா*** ஓடிட்டான்டா .`);
        }
      }
    });

    // Update previousPlayers to currentPlayers for next comparison
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
