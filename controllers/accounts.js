const AccountModel = require("../models/account");

const createAccountController = (req, res) => {
  const { name, number, accountType, bankId } = req.body;
  const account = new AccountModel({ name, number, accountType, bankId });
  account.save().then((result) => {
    if (result) res.json({ message: "Account created", data: result });
    else
      res.json({
        message: "Failed to create Account!",
      });
  });
};
const listAccountController = (req, res) => {
  const { id } = req.params;
  if (id) {
    AccountModel.find({ _id: id })
      .populate("bankId", "name location branch")
      .then((account) => {
        res.json({ data: account });
      })
      .catch((err) => console.log(err));
  } else {
    AccountModel.find()
      .populate("bankId", "name location branch")
      .then((accounts) => {
        res.json({ data: accounts });
      })
      .catch((err) => console.log(err));
  }
};

module.exports = {
  createAccountController,
  listAccountController,
};
