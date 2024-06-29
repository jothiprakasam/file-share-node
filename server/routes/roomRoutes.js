const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/", roomController.createRoom);
router.get("/", roomController.getRooms);
router.get("/:id", roomController.getRoom);
router.post("/:name/upload", roomController.uploadFile); // Use room name instead of ID
router.post("/verify", roomController.verifyPassword);

module.exports = router;
