// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const tentangKamiContoller = require("../controllers/tentangKamiContoller");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/tantangKamiValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    upload.single("image_background"),
    validateUploadFile({
        fieldName: "image_background",
        required: false,
    }),
    validate(createSchema),
    tentangKamiContoller.upsert
);
router.get("/", tentangKamiContoller.findData);
router.delete("/:id", tentangKamiContoller.delete);
router.get("/image/:gambar", tentangKamiContoller.getImageByName);

module.exports = router;
