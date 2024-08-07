const express = require("express");
const router = express.Router();
const founderController = require("../controllers/founderController");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/founderValidation");

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
    validate(createSchema),
    founderController.create
);
router.put(
    "/:id",
    validate(updateSchema),
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    founderController.update
);
router.get("/", founderController.findAll);
router.get("/:id", founderController.findOne);
router.delete("/:id", founderController.delete);
router.get("/image/:gambar", founderController.getImageByName);

module.exports = router;
