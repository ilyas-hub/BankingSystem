const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

exports.createAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    const existingAccount = await Account.findOne({ userId });
    if (existingAccount) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    const newAccount = new Account({ userId, balance: 0, transactions: [] });
    await newAccount.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      account: newAccount,
    });
  } catch (error) {
    console.error("Account creation error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getAccountDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const account = await Account.findOne({ userId }).populate("transactions");

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    res.json({ success: true, account });
  } catch (error) {
    console.error("Get account error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid deposit amount" });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    account.balance += amount;

    const transaction = new Transaction({ userId, type: "deposit", amount });
    await transaction.save();

    account.transactions.push(transaction._id);
    await account.save();

    res.json({
      success: true,
      message: "Deposit successful",
      balance: account.balance,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid withdrawal amount" });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    if (account.balance < amount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient funds" });
    }

    account.balance -= amount;

    const transaction = new Transaction({ userId, type: "withdraw", amount });
    await transaction.save();

    account.transactions.push(transaction._id);
    await account.save();

    res.json({
      success: true,
      message: "Withdrawal successful",
      balance: account.balance,
    });
  } catch (error) {
    console.error("Withdraw error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const account = await Account.findOne({ userId }).populate("transactions");

    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    res.json({ success: true, transactions: account.transactions });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
