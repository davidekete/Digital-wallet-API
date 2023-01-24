const express = require("express");
const { generateWallet } = require("../../utils/generateWallet");
const { Wallet } = require("../models/wallet");
const { findWallet } = require("../../utils/walletExists");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { email, balance } = req.body;

    const walletExists = await Wallet.fineOne({ where: { email } });

    if (walletExists != null) {
      res
        .status(401)
        .send({ message: "Wallet already exists", wallet: walletExists });
    }

    const walletAddress = generateWallet(email);

    const wallet = await Wallet.create({
      email,
      walletAddress,
      balance,
    });

    res.status(201).send({ message: "Wallet created suceessfully", wallet });
  } catch (error) {
    console.log(error);
  }
});

router.post("/debit", async (req, res) => {
  try {
    const { amount, debitAddress, recipientAddress } = req.body;

    const debitWallet = await findWallet(debitAddress);

    const recipientWallet = await findWallet(recipientAddress);

    if (debitWallet === null) {
      res.status(401).send("Debit Address does not exist");
    }

    if (recipientWallet === null) {
      res.status(401).send("Recipient Address does not exist");
    }

    if (amount > debitWallet.balance) {
      res.status(401).send("Insufficient funds");
    } else {
      debitWallet.balance -= amount;
      await debitWallet.save();

      recipientAddress.balance += amount;
      await recipientAddress.save();

      res.status(200).send({
        message: `${amount} sucessfully debited from ${debitWallet.email}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/credit", async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;

    const wallet = await findWallet(walletAddress);

    if (wallet === null) {
      res.status(401).send({ message: "Wallet Address does not exist" });
    } else {
      wallet.balance += amount;
      wallet.save();
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/activate", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const wallet = await findWallet(walletAddress);

    if (wallet === null) {
      res.status(401).send({ message: "Wallet address does not exist" });
    }

    if (wallet.active === true) {
      res.status(200).send({ message: "Wallet already active" });
    } else {
      wallet.active = true;
      await wallet.save();

      res.status(200).send({ message: "Wallet activated" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/deactivate", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const wallet = await findWallet(walletAddress);

    if (wallet === null) {
      res.status(401).send({ message: "Wallet address does not exist" });
    }

    if (wallet.active === true) {
      wallet.active = false;
      await wallet.save();
      res.status(200).send({ message: "Wallet deactivated successfully" });
    } else {
      res.status(200).send({ message: "Wallet not active" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
