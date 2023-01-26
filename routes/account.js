//import express, body-parser
const express = require("express");
const {
  createAccountController,
  listAccountController,
} = require("../controllers/accounts");
const router = express.Router();

router.post("/account", createAccountController);
// view accounts - with get method
router.get("/accounts/:id?", listAccountController);

module.exports = router;
