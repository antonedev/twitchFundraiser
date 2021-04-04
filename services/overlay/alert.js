let alertClients = [];

module.exports.handleEvent = (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no",
  };
  res.writeHead(200, headers);

  const clientID = Date.now();
  const newClient = {
    id: clientID,
    res,
  };
  alertClients.push(newClient);

  ping();

  req.on("close", () => {
    console.log(`${clientID}: Connection closed`);
    alertClients = alertClients.filter((client) => client.id !== clientID);
  });
};

module.exports.newDonation = (newDonation) => {
  alertClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(newDonation)}\n\n`);
  });
};

function ping() {
  alertClients.forEach((client) => {
    client.res.write(":\n\n");
  });
  setTimeout(() => {
    ping();
  }, 31000);
}
