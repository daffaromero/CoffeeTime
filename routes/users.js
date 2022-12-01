const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(cors(), advancedResults(User), getUsers)
  .post(cors(), createUser);

router
  .route("/:id")
  .get(cors(), getUser)
  .put(cors(), updateUser)
  .delete(cors(), deleteUser);

module.exports = router;
