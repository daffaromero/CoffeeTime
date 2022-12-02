const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");

const router = express.Router();

const cors = require("cors");
router.use(cors());

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, authorize("admin"), getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, authorize("admin"), updateOrderToDelivered);

module.exports = router;
