const express = require("express");
const router = express.Router();
const sosialMediaController = require("../controllers/sosialMediaController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    upload.single("icon"),
    validateUploadFile({
        fieldName: "icon",
    }),
    sosialMediaController.create
);
router.put(
    "/:id",
    upload.single("icon"),
    validateUploadFile({
        fieldName: "icon",
        required: false,
    }),
    sosialMediaController.update
);
router.get("/", sosialMediaController.findAll);
router.get("/:id", sosialMediaController.findOne);
router.delete("/:id", sosialMediaController.delete);

module.exports = router;
