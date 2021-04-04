require("dotenv").config();

const root = process.env.ROOT;
const express = require("express");

const bot = require(root + "/services/bot");
const { loadUsers } = require(root + "/services/bot/userTracker");
const router = require(root + "/routes/twitch");

const app = express();

app.set("trust proxy", true);
app.use((req, res, next) => {
  console.log("New " + req.method + " request for " + req.url + " from " + req.ip);
  next();
});

app.use("/", router);

app.listen(9001, () => {
  console.log("Started antoneService.");
  loadUsers();
  bot.connect();
});
