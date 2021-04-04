module.exports = (arg, username, displayName, channel) => {
  const { say, leaveChannel, joinChannel } = require(process.env.ROOT + "/services/bot");

  if (`#${username}` === channel || username === "paladinbros" || username === "antone9001") {
    if (arg) {
      joinChannel(arg, (err) => {
        if (err) say(channel, `Uh oh! ${err}`);
        else {
          leaveChannel(channel, (err) => {
            if (err) say(channel, `Uh oh! ${err}`);
            else say(channel, `/me has left the channel`);
          });
        }
      });
    } else
      say(
        channel,
        `One question ${displayName}, who are you going to raid? You must enter the name of the channel you're raiding. Like this: #raid ${channel}`
      );
  } else
    say(
      channel,
      `You're not authorized to make that request. Please contact the owner of the channel!`
    );
};
