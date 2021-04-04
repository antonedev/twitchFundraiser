module.exports = (arg, username, displayName, channel) => {
  const { say, joinChannel } = require(process.env.ROOT + "/services/bot");

  if (username === "antone9001" || username === "paladinbros") {
    if (arg)
      joinChannel(arg, (err) => {
        if (err) say(channel, `Uh oh! ${err}`);
        else say(channel, `Joined ${arg}.`);
      });
    else say(channel, `You must include the channel name after the join command.`);
  }
};
