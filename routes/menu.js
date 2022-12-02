const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const {
  getAllMenu,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  menuPhotoUpload,
} = require("../controllers/menuController");

const router = express.Router();

const cors = require("cors");
router.use(cors());

router.route("/").get(getAllMenu).post(protect, authorize("admin"), createMenu);

router
  .route("/:id")
  .get(getMenu)
  .put(protect, authorize("admin"), updateMenu)
  .delete(protect, authorize("admin"), deleteMenu);

module.exports = router;

router.route("/:id/photo").put(menuPhotoUpload);
