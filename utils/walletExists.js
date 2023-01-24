const { Wallet } = require("../src/models/wallet");

const findWallet = async function (address) {
  const wallet = await Wallet.findOne({ where: { walletAddress: address } });
  
  return wallet;
};

module.exports = findWallet;
