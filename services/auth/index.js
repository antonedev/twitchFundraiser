const fetch = require("node-fetch");

let classyAccessToken = null;
let classyExpireTime = null;

exports.getClassyAccessToken = (cb) => {
  const now = new Date().getTime();

  if (classyAccessToken && classyExpireTime > now) {
    return cb(classyAccessToken);
  }

  setClassyAccessToken((token) => {
    cb(token);
  });
};

function setClassyAccessToken(cb) {
  fetch(
    `https://api.classy.org/oauth2/auth?grant_type=client_credentials&client_id=${process.env.CLASSY_ID}&client_secret=${process.env.CLASSY_SECRET}`,
    { method: "post" }
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log("status:", response.status);
        return console.log(response.headers);
      } else return response.json();
    })
    .then((data) => {
      classyAccessToken = data.access_token;
      classyExpireTime = getExpireTime(data.expires_in);

      cb(data.access_token);
    })
    .catch((err) => {
      console.error("setClassyAccessToken", err);
    });
}

function getExpireTime(expires_in) {
  //expires_in represents SECONDS
  const now = new Date().getTime();
  return now + (expires_in - 60) * 1000;
}
