const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");
const cors = require("cors");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post(cors(), "/register", register);
router.post(cors(), "/login", login);
router.get(cors(), "/logout", logout);
router.get(cors(), "/me", protect, getMe);
router.put(cors(), "/updatedetails", protect, updateDetails);
router.put(cors(), "/updatepassword", protect, updatePassword);
router.post(cors(), "/forgotpassword", forgotPassword);
router.put(cors(), "/resetpassword/:resettoken", resetPassword);

module.exports = router;
