const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const cors = require("cors");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .post(cors(), protect, addOrderItems)
  .get(cors(), protect, authorize("admin"), getOrders);
router.route("/myorders").get(cors(), protect, getMyOrders);
router.route("/:id").get(cors(), protect, getOrderById);
router.route("/:id/pay").put(cors(), protect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(cors(), protect, authorize("admin"), updateOrderToDelivered);

module.exports = router;
