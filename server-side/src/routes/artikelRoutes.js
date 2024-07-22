// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    artikelController.create
);
router.put(
    "/:id",
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    artikelController.update
);
router.get("/", artikelController.findAll);
router.get("/:id", artikelController.findOne);
router.delete("/:id", artikelController.delete);

module.exports = router;
