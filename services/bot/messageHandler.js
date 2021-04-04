module.exports = (channel, senderInfo, message, self) => {
  const root = process.env.ROOT;
  const { say } = require(root + "/services/bot");
  const { addUser } = require(root + "/services/bot/userTracker");
  const {
    joinMessage,
    leaveMessage,
    raidMessage,
    factsMessage,
    raffleMessage,
  } = require(root + "/services/bot/messages");

  if (self || !message.startsWith("#") || senderInfo["message-type"] !== "chat") return;

  const messageArray = message.trim().split(" ");
  const command = messageArray[0].toLowerCase();
  const arg = messageArray[1];
  const displayName = senderInfo["display-name"];
  const username = senderInfo.username;
  // const isSenderMod = senderInfo.mod;
  // const isSenderSub = senderInfo.subscriber;

  addUser(username);

  switch (command) {
    case "#donor":
    case "#donate":
    case "#donation":
    case "#donations":
      say(
        channel,
        `This stream is supporting Pets In Need! To make a donation please visit https://bit.ly/3sNTWg9. All donors are entered to win #Swag from our sponser, Accept All Animals.`
      );
      break;
    case "#fact":
    case "#facts":
      say(channel, factsMessage());
      break;
    case "#swag":
      say(
        channel,
        `Our sponser is Accept All Animals! https://acceptallanimals.com Donors who provide a valid Twitch name are entered into a raffle for sweet sweet swag. Raffle to be held on 4/11/21 during the last stream.`
      );
      break;
    case "#join":
      joinMessage(arg, username, displayName, channel);
      break;
    case "#leave":
      leaveMessage(arg, username, displayName, channel);
      break;
    case "#raid":
      raidMessage(arg, username, displayName, channel);
      break;
    case "#raffle":
      raffleMessage(username, channel);
      break;
    case "#help":
      say(
        channel,
        `My commands are: #donate, #facts, #swag, and of course #help. If you are the channel owner you can remove me with #leave.`
      );
      break;
    default:
      console.log(`unhandled bot command: ${command} ${arg}`);
  }
};
