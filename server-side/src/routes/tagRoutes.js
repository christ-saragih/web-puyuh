const express = require("express");
const router = express.Router();
const tagControlller = require("../controllers/tagControlller");

router.post("/", tagControlller.create);
router.put("/:id", tagControlller.update);
router.get("/", tagControlller.findAll);
router.get("/:id", tagControlller.findOne);
router.delete("/:id", tagControlller.delete);

module.exports = router;
