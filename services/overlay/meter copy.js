let funds = {
  total: 0,
  target: 1500,
};
let clients = [];

module.exports.handleEvent = (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no",
  };
  res.writeHead(200, headers);
  res.write(`data: ${JSON.stringify(funds)}\n\n`);

  const clientID = Date.now();
  const newClient = {
    id: clientID,
    res,
  };
  clients.push(newClient);

  ping();

  req.on("close", () => {
    console.log(`${clientID}: Connection closed`);
    clients = clients.filter((client) => client.id !== clientID);
  });
};

module.exports.setTotal = (newTotal) => {
  funds.total = newTotal;
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(funds)}\n\n`);
  });
};

module.exports.setTarget = (newTarget) => {
  funds.target = newTarget;
};

function ping() {
  clients.forEach((client) => {
    client.res.write(":\n\n");
  });
  setTimeout(() => {
    ping();
  }, 30000);
}
