const express = require("express");
const router = express.Router();
const kontakFrontpageController = require("../controllers/kontakFrontpageController");

router.post("/", kontakFrontpageController.upsert);
router.get("/", kontakFrontpageController.findData);
router.delete("/:id", kontakFrontpageController.delete);

module.exports = router;
