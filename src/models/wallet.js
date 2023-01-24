const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Wallet = sq.define("wallet", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  walletAddress: {
    type: DataTypes.BIGINT,
  },

  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Wallet.sync().then(() => {
  console.log("Model synced");
});

module.exports = Wallet;
