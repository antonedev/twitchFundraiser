module.exports = (username, channel) => {
  const root = process.env.ROOT;
  const { say } = require(root + "/services/bot");
  const { isUser } = require(root + "/services/bot/userTracker");
  const { getDonationRecords } = require(root + "/services/classy/handleDonation");

  if (username === "moonmodel94" || username === "paladinbros" || username === "antone9001") {
    const records = getDonationRecords();
    const validUsers = [];
    records.forEach((record) => {
      if (isUser(record.name)) validUsers.push(record.name);
    });
    const length = validUsers.length;
    const raffleWinner = Math.floor(Math.random() * length);
    const winner = validUsers[raffleWinner];
    say(channel, `Drumroll please!!!`);
    setTimeout(() => {
      say(channel, `And the winner is... ${winner}!!!`);
    }, 2000);
  }
};
