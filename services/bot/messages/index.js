const root = process.env.ROOT;
exports.joinMessage = require(root + "/services/bot/messages/join");
exports.leaveMessage = require(root + "/services/bot/messages/leave");
exports.raidMessage = require(root + "/services/bot/messages/raid");
exports.factsMessage = require(root + "/services/bot/messages/facts");
exports.raffleMessage = require(root + "/services/bot/messages/raffle");
