const express = require("express");
const {
  createWallet,
  debitWalletAddress,
  creditWallet,
  activateWallet,
  deactivateWallet,
} = require("../controllers/walletController");

const router = express.Router();

router.post("/create", createWallet);

router.post("/debit", debitWalletAddress);

router.post("/credit", creditWallet);

router.post("/activate", activateWallet);

router.post("/deactivate", deactivateWallet);

// router.get("/allWallets", async (req, res) => {
//   const wallets = await Wallet.findAll();

//   res.send(wallets);
// });

module.exports = router;
