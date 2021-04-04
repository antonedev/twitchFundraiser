const fetch = require("node-fetch");
const root = process.env.ROOT;
const { getClassyAccessToken } = require(root + "/services/auth");
const { handleDonation } = require(root + "/services/classy/handleDonation");

const handledIDs = new Set();
let currentURL = "https://api.classy.org/2.0/campaigns/329900/transactions?per_page=1&page=1";

const start = (module.exports.start = () => {
  getTransaction((tx) => {
    if (tx) {
      handleDonation(tx);
    }
    setTimeout(() => {
      start();
    }, 5500);
  });
});

function getTransaction(cb) {
  fetchResource(currentURL, (response) => {
    if (!response.data[0]) return cb();
    const tx = response.data[0];

    if (handledIDs.has(tx.id)) {
      if (response.next_page_url) {
        currentURL = response.next_page_url;
        getTransaction(cb);
      } else {
        return cb(null);
      }
    } else {
      handledIDs.add(tx.id);
      handleTransaction(tx, (result) => {
        if (result) {
          cb({ id: tx.id, ...result });
        } else return getTransaction(cb);
      });
    }
  });
}

function handleTransaction(tx, cb) {
  if (tx.status === "success") {
    getTwitchUsername(tx.id, (username) => {
      if (!username) username = "error";
      return cb({
        name: username,
        comment: tx.comment.trim(),
        amount: tx.total_gross_amount,
        isAnon: tx.is_anonymous,
        // honorOf: tx.in_honor_of,
      });
    });
  } else if (tx.status === "incomplete") {
    handledIDs.delete(tx.id);
    return cb(null);
  } else return cb(null);
}

function fetchResource(url, cb) {
  getClassyAccessToken((token) => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.headers);
          return console.log(response);
        } else return response.json();
      })
      .then((data) => cb(data))
      .catch((error) => console.log("fetchResource caught error: ", error));
  });
}

function getTwitchUsername(txID, cb) {
  fetchResource(`https://api.classy.org/2.0/questions/665443/answers`, (res) => {
    res.data.forEach((response) => {
      if (response.answerable_id === txID) {
        return cb(response.answer);
      }
    });
  });
}
