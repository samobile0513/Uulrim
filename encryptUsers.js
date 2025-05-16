const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = "my-secret-key-9807161223";

const users = [
  { username: "fnlunasea", password: "9833" },
  { username: "ba001995123", password: "samobile" },
];

const encryptedUsers = users.map(user => ({
  username: CryptoJS.AES.encrypt(user.username, ENCRYPTION_KEY).toString(),
  password: CryptoJS.AES.encrypt(user.password, ENCRYPTION_KEY).toString(),
}));

console.log(JSON.stringify(encryptedUsers, null, 2));