const generateWallet = require("../../utils/generateWallet");
const Wallet = require("../models/wallet");
const findWallet = require("../../utils/walletExists");
const { isEmail } = require("class-validator");

const createWallet = async (req, res) => {
  try {
    const { email, balance } = req.body;

    if (isEmail(email)) {
      const walletExists = await Wallet.findOne({ where: { email } });

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
    } else {
      res.status(401).send({ message: "Please enter a valid email" });
    }
  } catch (error) {
    console.log(error);
  }
};

const debitWalletAddress = async (req, res) => {
  try {
    const { amount, debitAddress, recipientAddress } = req.body;

    const debitWallet = await findWallet(debitAddress);

    const recipientWallet = await findWallet(recipientAddress);

    if (debitWallet === null || debitWallet.active === false) {
      res.status(401).send({ message: "Debit Address does not exist" });
    }

    if (recipientWallet === null || recipientWallet.active === false) {
      res.status(401).send({ message: "Recipient Address does not exist" });
    }

    if (debitAddress === recipientAddress) {
      res.status(401).send({ message: "Invalid parameters" });
    }

    if (amount > debitWallet.balance) {
      res.status(401).send("Insufficient funds");
    } else {
      debitWallet.balance -= amount;
      await debitWallet.save();

      recipientWallet.balance += amount;
      await recipientWallet.save();

      res.status(200).send({
        message: `${amount} sucessfully debited from ${debitWallet.email}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const creditWallet = async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;

    const wallet = await findWallet(walletAddress);

    if (wallet === null || wallet.active === false) {
      res.status(401).send({ message: "Wallet Address does not exist" });
    } else {
      wallet.balance += amount;
      wallet.save();
      res
        .status(200)
        .send({ message: `${amount} successfully added to ${walletAddress}` });
    }
  } catch (error) {
    console.log(error);
  }
};

const activateWallet = async (req, res) => {
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
};

const deactivateWallet = async (req, res) => {
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
};

module.exports = {
  createWallet,
  debitWalletAddress,
  creditWallet,
  activateWallet,
  deactivateWallet,
};
