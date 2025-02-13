const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getCustomers,
  getTransactionHistory,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/signup", signup);
router.get("/getCustomers", getCustomers);
router.get("/transactions/:userId", getTransactionHistory);

module.exports = router;
