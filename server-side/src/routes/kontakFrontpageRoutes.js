const express = require("express");
const router = express.Router();
const kontakFrontpageController = require("../controllers/kontakFrontpageController");

router.post("/", kontakFrontpageController.upsert);
// router.post("/", kontakFrontpageController.create);
// router.put("/:id", kontakFrontpageController.update);
router.get("/", kontakFrontpageController.findAll);
router.get("/:id", kontakFrontpageController.findOne);
router.delete("/:id", kontakFrontpageController.delete);

module.exports = router;
