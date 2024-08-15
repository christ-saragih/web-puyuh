// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/artikelValidation");

router.post(
    "/",
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    validate(createSchema),
    artikelController.create
);
router.put(
    "/:id",
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
        required: false,
    }),
    validate(updateSchema),
    artikelController.update
);
router.get("/", artikelController.findAll);
// router.get("/:id", artikelController.findOne);
router.get("/:slug", artikelController.findDataBySlug);
router.delete("/:id", artikelController.delete);
router.get("/image/:gambar", artikelController.getImageByName);
router.get("/filter/tag", artikelController.getArticleByTag);

module.exports = router;
