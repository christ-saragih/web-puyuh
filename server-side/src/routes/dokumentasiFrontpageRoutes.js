const express = require("express");
const router = express.Router();
const dokumentasiControlller = require("../controllers/dokumentasiFrontapageController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/dokumentasiValidation");

router.post(
    "/",
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
    }),
    validate(createSchema),
    dokumentasiControlller.create
);
router.put(
    "/:id",
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
        required: false,
    }),
    validate(updateSchema),
    dokumentasiControlller.update
);
router.get("/", dokumentasiControlller.findAll);
router.get("/:id", dokumentasiControlller.findOne);
router.delete("/:id", dokumentasiControlller.delete);

module.exports = router;
