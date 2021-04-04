const fs = require("fs");
const users = new Set();

console.log("userTracker initilizing...\nusers:", users);
const stream = fs.createWriteStream("user_log", { flags: "a" });

exports.addUser = (username) => {
  if (!users.has(username)) {
    stream.write(username + ",");
    users.add(username);
  }
};

exports.isUser = (username) => {
  return users.has(username.toLowerCase());
};

exports.loadUsers = () => {
  console.log("loadings users on file...");
  fs.readFile("user_log", "utf-8", (err, file) => {
    if (err) console.error(err);
    const arrOfUsers = file.split(",");
    arrOfUsers.forEach((user) => {
      users.add(user);
    });
    console.log("all users:", users);
  });
};
