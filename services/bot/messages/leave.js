module.exports = (arg, username, displayName, channel) => {
  const { say, leaveChannel } = require(process.env.ROOT + "/services/bot");
  
  if (`#${username}` === channel || username === "paladinbros" || username === "antone9001") {
    leaveChannel(channel, (err) => {
      if (err) say(channel, `Uh oh! ${err}`);
      else say(channel, `/me has left the channel`);
    });
  } else
    say(
      channel,
      `You're not authorized to make that request. Please contact the owner of the channel!`
    );
};
