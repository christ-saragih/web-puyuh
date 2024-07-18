const express = require("express");
const router = express.Router();
const dokumentasiControlller = require("../controllers/dokumentasiFrontapageController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
    }),
    dokumentasiControlller.create
);
router.put(
    "/:id",
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
        required: false,
    }),
    dokumentasiControlller.update
);
router.get("/", dokumentasiControlller.findAll);
router.get("/:id", dokumentasiControlller.findOne);
router.delete("/:id", dokumentasiControlller.delete);

module.exports = router;
