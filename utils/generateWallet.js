const crypto = require("crypto");

const generateWallet = function (email) {
  const hash = crypto
    .createHash("sha256", "wallet")
    .update(email)
    .digest("hex");

  let charAscii = [];
  let walletAddress;

  for (let i = 0; i < Math.min(hash.length, 10); i++) {
    let char = hash.charCodeAt(i);
    charAscii.push(char);
  }
  charAscii = charAscii.join("");

  walletAddress =
    charAscii.length === 10
      ? parseInt(charAscii)
      : parseInt(charAscii.slice(0, 10));

  return walletAddress;
};

console.log(generateWallet("eketedavid@gmail.com"));

module.exports = generateWallet;
