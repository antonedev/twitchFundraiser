const root = process.env.ROOT;
const tmi = require("tmi.js");
const messageHandler = require(root + "/services/bot/messageHandler");
const { addUser, deleteUser } = require(root + "/services/bot/userTracker");
const channels = new Set();

const client = new tmi.client({
  identity: {
    username: "petsinneedbot",
    password: process.env.PETSINNEEDBOT_OAUTH,
  },
});

client.on("message", messageHandler);

client.on("join", (channel, username, self) => {
  if (self) return;
  addUser(username);
});

client.on("connected", (address, port) => {
  console.log(`Connected to ${address} on port ${port}`);
  joinChan("#paladinbros", (err) => {
    if (err) console.log(err);
  });
  setTimeout(() => {
    reminder();
  }, 10000);
});

exports.connect = () => {
  client.connect();
};

var joinChan = (exports.joinChannel = (channel, cb) => {
  client
    .join(channel)
    .then((data) => {
      console.log("joined:", data[0]);
      channels.add(data[0]);
      client.say(channel, "/me has joined the channel");
      cb(null);
    })
    .catch((err) => {
      cb(err);
    });
});

exports.leaveChannel = (channel, cb) => {
  client
    .part(channel)
    .then((data) => {
      console.log("left:", data);
      channels.delete(channel);
      cb(null);
    })
    .catch((err) => {
      cb(err);
    });
};

exports.alert = (donation) => {
  let message = `Thank you, ${donation.name}! Your donation of ${donation.amount} will help save the lives of many animals in the future!`;
  const anonMessage = `Someone anonymously donated $${donation.amount}! Thank you, mysterious benefactor!`;
  if (donation.name === "Someone Anonymous") message = anonMessage;
  channels.forEach((channel) => {
    client.say(channel, message);
  });
};

exports.say = (channel, message) => {
  client.say(channel, message);
};

function reminder() {
  channels.forEach((channel) => {
    client.say(
      channel,
      `With the help of our donors, Pets In Need grants second chances to the most at-risk animals in public facilities. Find out how you can help out by typing #Donate into chat! You can also try #Facts for interesting tidbits about Pets In Need! Or just Donate now: https://bit.ly/3sNTWg9`
    );
  });
  setTimeout(() => {
    reminder();
  }, 30 * 60 * 1000);
}
