const express = require("express");
const { body } = require("express-validator");
const {
  listBanksController,
  createBankController,
  updateBankController,
  deleteBankController,
} = require("../controllers/banks");

const BankModel = require("../models/bank");
const router = express.Router();

// view banks - get method
router.get("/banks/:id?", listBanksController);

// create bank - post method
router.post(
  "/bank",
  [
    body("name").trim().not().isEmpty().withMessage("Name field is required!"),
    body("location")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Location field is required!"),
    body("branch")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Branch field is required!"),
    body("phone")
      .isMobilePhone("en-GH")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankDoc) => {
          if (bankDoc) return Promise.reject("Phone number is already in use");
        });
      }),
  ],
  createBankController
);
// update bank - put/patch method
router.put("/bank", updateBankController);
// delete bank - delete method
router.delete("/bank", deleteBankController);
// create account - post method

module.exports = router;
