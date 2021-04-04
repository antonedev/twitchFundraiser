const root = process.env.ROOT;
const meter = require(root + "/services/overlay/meter");
const ticker = require(root + "/services/overlay/ticker");
const alert = require(root + "/services/overlay/alert");
const bot = require(root + "/services/bot");
const { isUser } = require(root + "/services/bot/userTracker");

let totalDonations = 0;
const donationRecords = [];

let handleDonation = (module.exports.handleDonation = (tx) => {
  let name = tx.name;
  const amount = tx.amount;
  const isAnon = tx.isAnon;

  if (isAnon || !isUser(name)) name = "Someone Anonymous";

  const newTotal = amount + parseFloat(totalDonations);
  totalDonations = newTotal.toFixed(2);
  donationRecords.push(tx);

  meter.setTotal(totalDonations);
  ticker.addDonation({ name, amount });
  alert.newDonation({ name, amount });
  bot.alert({ name, amount });
});

module.exports.getDonationRecords = () => {
  return donationRecords;
};

module.exports.testDonation = () => {
  testTx = {
    name: "Antone9001",
    amount: 0.01,
    isAnon: false,
  };
  handleDonation(testTx);
};
