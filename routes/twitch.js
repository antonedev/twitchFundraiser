const root = process.env.ROOT;

const express = require("express");
const classy = require(root + "/services/classy");
const meter = require(root + "/services/overlay/meter");
const ticker = require(root + "/services/overlay/ticker");
const alert = require(root + "/services/overlay/alert");
const { testDonation } = require(root + "/services/classy/handleDonation");

const router = express.Router();

router.use(express.json());
router.use(express.static("public"));

router.get("/overlay/meter", (req, res) => {
  res.sendFile(root + "/views/meter.html");
});

router.get("/overlay/ticker", (req, res) => {
  res.sendFile(root + "/views/ticker.html");
});

router.get("/overlay/alert", (req, res) => {
  res.sendFile(root + "/views/alert.html");
});

router.get("/overlay/alert/test", (req, res) => {
  res.sendFile(root + "/views/alert-test.html");
});

router.get("/meter", meter.handleEvent);

router.get("/ticker", ticker.handleEvent);

router.get("/alert", alert.handleEvent);

router.get("/pin-fundraiser/start", (req, res) => {
  classy.start();
  res.json({ message: "fundraiser services started" });
});

router.get("/pin-fundraiser/test", (req, res) => {
  testDonation();
  res.json({ message: "OK" });
});

router.get("/pin-fundraiser/updateTarget", (req, res) => {
  const target = req.query.target;
  if (!target) {
    res.json({ error: "specify target" });
  } else {
    meter.setTarget(target);
    res.json({ message: "updated target amount" });
  }
});

module.exports = router;
