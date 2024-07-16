const express = require("express");
const router = express.Router();
const berandaController = require("../controllers/berandaFrontpageController");
const upload = require("../middleware/uploadImageMiddleware");

router.post("/", upload.single("image_header"), berandaController.create);
router.put("/:id", upload.single("image_header"), berandaController.update);
router.get("/", berandaController.findAll);
router.get("/:id", berandaController.findOne);
router.delete("/:id", berandaController.delete);

module.exports = router;
