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
    validate(createSchema),
    upload.single("image_background"),
    validateUploadFile({
        fieldName: "image_background",
    }),
    tentangKamiContoller.create
);
router.put(
    "/:id",
    validate(updateSchema),
    upload.single("image_background"),
    validateUploadFile({
        fieldName: "image_background",
    }),
    tentangKamiContoller.update
);
router.get("/", tentangKamiContoller.findAll);
router.get("/:id", tentangKamiContoller.findOne);
router.delete("/:id", tentangKamiContoller.delete);

module.exports = router;
