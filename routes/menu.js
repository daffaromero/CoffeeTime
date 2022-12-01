const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const cors = require("cors");

const {
  getAllMenu,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  menuPhotoUpload,
} = require("../controllers/menuController");

const router = express.Router();
router
  .route("/")
  .get(cors(), getAllMenu)
  .post(cors(), protect, authorize("admin"), createMenu);

router
  .route("/:id")
  .get(cors(), getMenu)
  .put(cors(), protect, authorize("admin"), updateMenu)
  .delete(cors(), protect, authorize("admin"), deleteMenu);

module.exports = router;

router.route("/:id/photo").put(cors(), menuPhotoUpload);
