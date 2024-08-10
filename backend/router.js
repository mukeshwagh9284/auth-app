const {
  addUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} = require("./controller");
const express = require("express");
const router = express.Router();
router.post("/add", addUser);
router.post("/login", loginUser);
router.post("/request-reset-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
// userModule.exports = router;
