let recentDonations = [];
let tickerClients = [];

module.exports.handleEvent = (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no",
  };
  res.writeHead(200, headers);
  res.write(`data: ${JSON.stringify(recentDonations)}\n\n`);

  const clientID = Date.now();
  const newClient = {
    id: clientID,
    res,
  };
  tickerClients.push(newClient);

  ping();

  req.on("close", () => {
    console.log(`${clientID}: Connection closed`);
    tickerClients = tickerClients.filter((client) => client.id !== clientID);
  });
};

module.exports.addDonation = (newDonation) => {
  if (newDonation.name !== "Someone Anonymous") {
    recentDonations.push(newDonation);
  }
  if (recentDonations.length >= 3) {
    const numToShift = recentDonations.length - 3;
    for (let i = 0; i < numToShift; i++) {
      recentDonations.shift()
    }
  }
  tickerClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(recentDonations)}\n\n`);
  });
};

function ping() {
  tickerClients.forEach((client) => {
    client.res.write(":\n\n");
  });
  setTimeout(() => {
    ping();
  }, 31000);
}
