const express = require("express");
const ReqController = require("../controllers/requestController");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/send-request", authMiddleware, ReqController.sendRequest);
router.post("/my-request", authMiddleware, ReqController.myRequests);
router.post("/accept-request", authMiddleware, ReqController.acceptRequest);
router.post("/reject-request", authMiddleware, ReqController.blockRequest);

module.exports = router;
