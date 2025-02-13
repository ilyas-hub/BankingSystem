const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccountDetails,
  deposit,
  withdraw,
  getTransactions,
} = require("../controllers/accountController");

router.post("/create", createAccount);
router.get("/:userId", getAccountDetails);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.get("/:userId/transactions", getTransactions);

module.exports = router;
