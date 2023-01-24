const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const { isEmail } = require("class-validator");

const Wallet = sq.define("wallet", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    validate: isEmail,
  },

  walletAddress: {
    type: DataTypes.INTEGER,
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

module.exports = Wallet;
